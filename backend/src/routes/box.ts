import type { FastifyPluginAsync } from "fastify";
import { prisma } from "../lib/prisma.js";

type CreateBoxBody = {
  name: string;
  shelfId: string;
};

export const boxRoutes: FastifyPluginAsync = async (app) => {
  // CREATE BOX
  app.post<{ Body: CreateBoxBody }>("/box", async (request, response) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  });
};
