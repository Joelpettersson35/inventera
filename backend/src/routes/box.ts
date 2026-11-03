import type { FastifyPluginAsync } from "fastify";
import { prisma } from "../lib/prisma.js";

type CreateBoxBody = {
  name: string;
  shelfId: string;
};

export const boxRoutes: FastifyPluginAsync = async (app) => {
  //GET BOX
  app.get<{ Params: { id: string } }>("/box/:id", async (request, response) => {
    console.log(request.params.id);
    const box = await prisma.box.findUnique({
      where: {
        id: request.params.id,
      },
      include: {
        articles: {
          include: {
            article: true,
          },
        },
      },
    });

    if (!box) {
      return response.code(404).send({ message: "Lådan hittades inte" });
    }

    return response.code(200).send(box);
  });

  // CREATE BOX
  app.post<{ Body: CreateBoxBody }>(
    "/box",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "shelfId"],
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 200,
            },
            shelfId: {
              type: "string",
              minLength: 1,
              maxLength: 200,
            },
          },
        },
      },
    },
    async (request, response) => {
      const boxName = request.body.name.trim();
      if (!boxName.trim()) {
        return response.code(404).send({ message: "Lådan saknar ett namn" });
      }

      const shelfId = request.body.shelfId;
      const shelf = await prisma.shelf.findUnique({
        where: {
          id: shelfId,
        },
      });

      if (!shelf) {
        return response
          .code(404)
          .send({ message: "Markerad hylla verkar inte finns" });
      }

      const box = await prisma.box.create({
        data: {
          name: boxName,
          shelfId: shelfId,
        },
      });

      return response.code(200).send(box);
    },
  );
};
