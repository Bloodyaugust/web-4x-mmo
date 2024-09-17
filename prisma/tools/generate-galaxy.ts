import {
  createDefaultCli,
  namedParam,
  runDefaultCli,
  types,
} from "@hediet/cli";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CmdData {
  run(): Promise<void>;
}

const cli = createDefaultCli<CmdData>().addCmd({
  name: "generate-galaxy",
  description: "Generates a new galaxy from scratch, destroying the old one.",
  namedParams: {
    systems: namedParam(types.int, {
      description: "How many systems to generate",
    }),
    worlds: namedParam(types.int, {
      description: "How many worlds to generate per system",
    }),
  },
  getData: (args) => ({
    async run() {
      await prisma.world.deleteMany();
      await prisma.system.deleteMany();
      await prisma.empire.deleteMany();
      console.log("Deleted all worlds, systems, and empires.");

      const bigChungus = await prisma.empire.create({
        data: {
          name: "Big Chungus",
          turns: 0,
        },
      });
      await prisma.empire.create({
        data: {
          name: "Small Chungus",
          turns: 0,
        },
      });

      for (let i = 0; i < args.systems; i++) {
        const newSystem = await prisma.system.create({
          data: {
            name: `System ${i}`,
          },
        });

        for (let x = 0; x < args.worlds; x++) {
          await prisma.world.create({
            data: {
              name: `World ${i}-${x}`,
              locationX: 0,
              locationY: 0,
              system: {
                connect: {
                  id: newSystem.id,
                },
              },
            },
          });
        }
      }

      const firstWorld = await prisma.world.findFirst();

      if (firstWorld) {
        await prisma.world.update({
          where: {
            id: firstWorld.id,
          },
          data: {
            owner: {
              connect: {
                id: bigChungus.id,
              },
            },
          },
        });
      }

      console.log(
        `Created ${args.systems} systems with ${
          args.worlds
        } worlds each, total ${args.systems * args.worlds} worlds.`
      );

      await prisma.$disconnect();
    },
  }),
});

runDefaultCli({
  info: {
    appName: "Generate Galaxy",
    version: "1.0.0",
  },
  cli,
  dataHandler: (data) => data.run(),
});
