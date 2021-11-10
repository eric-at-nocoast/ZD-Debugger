const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class UserService {
  static async someUsers() {
    const Users = await prisma.users.findMany({
      skip: 3,
      take: 7,
      select: {
        email: true,
        first_name: true,
        last_name: true,
      },
    });
    return Users;
  }

  static async deleteUsers(data) {
    const { email } = data;
    const trashUsers = await prisma.users.delete({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });
    return trashUsers;
  }
}
module.exports = UserService;
