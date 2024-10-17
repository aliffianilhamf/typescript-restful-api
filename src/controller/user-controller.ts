import { Request, Response, NextFunction } from "express";
import { CreateUserRequest } from "../model/user-model";
import { UserSevice } from "../service/user-service";

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
}
