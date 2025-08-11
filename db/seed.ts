import { PrismaClient } from "../lib/generated/prisma";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  // Clear tables in the correct order to avoid FK constraint errors
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  // Insert products
  await prisma.product.createMany({
    data: sampleData.products,
  });

  // Insert users
  await prisma.user.createMany({
    data: sampleData.users,
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
