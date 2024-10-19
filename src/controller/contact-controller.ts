import { NextFunction, Request, Response } from "express";
import { ContactService } from "../service/contact-service";
import { CreateContactRequest } from "../model/contact-model";
import { UserRequest } from "../type/user-request";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const response = await ContactService.create(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
