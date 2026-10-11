import Fastify from "fastify";
import { prisma } from "./lib/prisma.js";

const app = Fastify({
  logger:
    process.env.NODE_ENV === "production"
      ? {
          level: "info",
        }
      : {
          level: "info",
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:HH:MM:ss",
              ignore: "pid,hostname",
              singleLine: true,
            },
          },
        },
});

app.get("/api/health", async () => {
  return {
    status: "ok",
  };
});

app.get("/api/categories", async () => {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
});

app.addHook("onClose", async () => {
  await prisma.$disconnect();
});

async function start() {
  try {
    await app.listen({
      port: 3000,
      host: "127.0.0.1",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

await start();