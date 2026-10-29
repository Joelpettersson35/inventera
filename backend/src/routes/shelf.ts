import type { FastifyPluginAsync } from "fastify";
import { prisma } from "../lib/prisma.js";

type CreateShelfBody = {
    name: string;
}

export const shelfRoutes: FastifyPluginAsync = async (app) => {
    //POST shelf
    app.post<{Body: CreateShelfBody}>("/shelf", {
        schema: {
            body: {
                type: "object",
                required: ["name"],
                additionalProperties: false,
                properties: {
                    name: {
                    type: "string",
                    minLength: 1,
                    maxLength: 200,
                    },
                }
            }
        }
    },
    async (request, reply) => {
        const name = request.body.name.trim();

        if (!name) {
            return reply.code(400).send({
            message: "Ge hyllan ett namn.",
        });
        }

    const shelf = await prisma.shelf.create({
    data: { name },
    });

  return reply.code(201).send(shelf);
});

    // GET /api/shelves
  app.get("/shelves", async () => {
    return prisma.shelf.findMany();
  });
}