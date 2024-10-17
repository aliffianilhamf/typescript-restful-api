import { prismaClient } from "../application/database";
import { ResponseError } from "../error/respon-error";
import {
  CreateUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

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
}
