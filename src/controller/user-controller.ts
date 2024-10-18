import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserSevice } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      // buat body request menjadi CreateUserRequest
      const request: CreateUserRequest = req.body as CreateUserRequest;
      // kirim ke service
      const response = await UserSevice.register(request);
      //  kirim balikan ke client dalam bentuk json
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      // agar di midleware yang error bisa di tangkap
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      // buat body request menjadi CreateUserRequest
      const request: CreateUserRequest = req.body as CreateUserRequest;
      // kirim ke service
      const response = await UserSevice.login(request);
      //  kirim balikan ke client dalam bentuk json
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      // agar di midleware yang error bisa di tangkap
      next(error);
    }
  }

  static async getUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // kirim ke service
      const response = await UserSevice.getUser(req.user!);
      //  kirim balikan ke client dalam bentuk json
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      // agar di midleware yang error bisa di tangkap
      next(error);
    }
  }

  static async updateUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // buat body request menjadi CreateUserRequest
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      // kirim ke service
      const response = await UserSevice.update(req.user!, request);
      //  kirim balikan ke client dalam bentuk json
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      // agar di midleware yang error bisa di tangkap
      next(error);
    }
  }
}
