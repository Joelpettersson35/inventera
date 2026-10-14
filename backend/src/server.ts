import Fastify from "fastify";
import { prisma } from "./lib/prisma.js";
import cors from "@fastify/cors";
import articleRoutes from "./routes/article.js";
import categoryRoutes from "./routes/category.js";

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
],
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

await app.register(categoryRoutes, {
  prefix: "/api",
});

await app.register(articleRoutes, {
  prefix: "/api",
});

app.addHook("onClose", async () => {
  await prisma.$disconnect();
});

async function start() {
  try {
    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

await start();