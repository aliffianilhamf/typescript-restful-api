import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/respon-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserSevice {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    // lakukan validasi terelebih dahulu
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );
    // cek username pernah di registrasi belum di database
    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "Username already exists");
    }

    // ubah data password telebih dahulu
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // user di prisma balikannya adalah sebuah type user di prisma
    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    // balikan data user menjadi type model userResponse

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    // validasi terlebih dahulu
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    // cek username di database
    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    // jika user tidak ditemukan
    if (!user) {
      throw new ResponseError(400, "Username or password is wrong");
    }

    // cek password
    const isPasswordMatch = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    // jika password tidak cocok
    if (!isPasswordMatch) {
      throw new ResponseError(400, "Username or password is wrong");
    }

    // update token
    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    // balikan data user menjadi type model userResponse
    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  static async getUser(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return toUserResponse(result);
  }

  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(result);
  }
}
