import Fastify from "fastify";
import type { FastifyError } from "fastify";
import { prisma } from "./lib/prisma.js";
import cors from "@fastify/cors";
import articleRoutes from "./routes/article.js";
import categoryRoutes from "./routes/category.js";
import { shelfRoutes } from "./routes/shelf.js";
import { boxRoutes } from "./routes/box.js";

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

await app.register(cors, {
  origin: [
    "http://localhost:5173",
    "http://192.168.1.153:5173",
    "http://192.168.1.83:5173",
    "http://10.59.246.90:5173",
    "http://10.59.246.93:5173",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.setErrorHandler<FastifyError>((error, request, reply) => {
  if (error.validation) {
    return reply.code(400).send({
      message:
        "Kontrollera att alla obligatoriska uppgifter är korrekt ifyllda.",
    });
  }

  const status = error.statusCode ?? 500;

  if (status >= 400 && status < 500) {
    return reply.code(status).send({
      message: "Anropet kunde inte behandlas. Kontrollera uppgifterna.",
    });
  }

  request.log.error({ err: error }, "Ett oväntat serverfel inträffade");

  return reply.code(500).send({
    message: "Ett serverfel inträffade. Försök igen senare.",
  });
});

await app.register(articleRoutes, {
  prefix: "/api",
});

await app.register(categoryRoutes, {
  prefix: "/api",
});

await app.register(shelfRoutes, {
  prefix: "/api",
});

await app.register(boxRoutes, {
  prefix: "/api",
});

app.addHook("onClose", async () => {
  await prisma.$disconnect();
});

async function start() {
  try {
    await prisma.$connect();

    await prisma.$queryRaw`SELECT 1`; // Verifiera anslutningen till databasen

    app.log.info("Anslutningen till databasen fungerar.");

    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });
    console.log(process.env.DATABASE_URL);
  } catch (error) {
    app.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

await start();
