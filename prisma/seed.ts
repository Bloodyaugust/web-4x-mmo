import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const empire = await prisma.empire.upsert({
    where: {
      name: "Big Chungus",
    },
    create: {
      name: "Big Chungus",
      turns: 0,
    },
    update: {},
  });
  await prisma.empire.upsert({
    where: {
      name: "Small Chungus",
    },
    create: {
      name: "Small Chungus",
      turns: 0,
    },
    update: {},
  });

  const system = await prisma.system.upsert({
    where: {
      name: "Sol",
    },
    create: {
      name: "Sol",
    },
    update: {},
  });

  await prisma.world.upsert({
    where: {
      name: "Earth",
    },
    create: {
      name: "Earth",
      locationX: 0,
      locationY: 0,
      system: {
        connect: {
          name: system.name,
        },
      },
      owner: {
        connect: {
          name: empire.name,
        },
      },
    },
    update: {},
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
