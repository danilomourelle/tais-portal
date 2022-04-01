import { PrismaClient } from "@prisma/client";
import usersWithPosts from "./seeds/userPosts";
const prisma = new PrismaClient();

async function main() {
  await usersWithPosts(prisma)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
