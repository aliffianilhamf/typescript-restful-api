import { prismaClient } from "../application/database";
import { ResponseError } from "../error/respon-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
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
}
