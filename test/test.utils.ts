import { User } from "@prisma/client";
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
}
