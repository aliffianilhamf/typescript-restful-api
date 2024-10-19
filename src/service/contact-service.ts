import { Contact, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const contact = await prismaClient.contact.create({
      data: record,
    });
    logger.debug("record : " + JSON.stringify(record));
    return toContactResponse(contact);
  }
}
