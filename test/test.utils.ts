import { Contact, User } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "testing",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "testing",
        password: await bcrypt.hash("testing", 10),
        name: "testing",
        token: "testing",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        username: "testing",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user!;
  }
}

export class ContactTest {
  static async delete() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "testing",
      },
    });
  }

  static async create() {
    await prismaClient.contact.create({
      data: {
        first_name: "Aliffian",
        last_name: "Ilham",
        email: "aliffian@mail.com",
        phone: "081234567890",
        username: "testing",
      },
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "testing",
      },
    });

    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact!;
  }
}
