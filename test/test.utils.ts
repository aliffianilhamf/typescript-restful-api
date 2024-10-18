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
}
