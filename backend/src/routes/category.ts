import type { FastifyPluginAsync } from "fastify";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

type CreateCategoryBody = {
  name: string;
  fields: {
    label: string;
    type: "TEXT" | "NUMBER" | "BOOLEAN";
    required: boolean;
  }[];
};

const categoryRoutes: FastifyPluginAsync = async (app) => {

    app.get("/categories", async () => {
    return prisma.category.findMany({
      include: {
        fields: true
      },
      orderBy: {
        name: "asc",
      },
    });
  });
  // POST /api/categories
  app.post<{ Body: CreateCategoryBody }>(
    "/categories",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "fields"],
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 200,
            },
            fields: {
              type: "array",
              maxItems: 50,
              items: {
                type: "object",
                required: ["label", "type", "required"],
                additionalProperties: false,
                properties: {
                  label: {
                    type: "string",
                    minLength: 1,
                    maxLength: 200,
                  },
                  type: {
                    type: "string",
                    enum: ["TEXT", "NUMBER", "BOOLEAN"],
                  },
                  required: {
                    type: "boolean",
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, fields } = request.body;

      if (!name.trim()) {
        return reply.code(400).send({
          message: "Kategorinamn saknas.",
        });
      }

      if (fields.some((field) => !field.label.trim())) {
        return reply.code(400).send({
          message: "Alla fält måste ha ett namn.",
        });
      }

      try {
        const category = await prisma.category.create({
          data: {
            name: name.trim(),
            fields: {
              create: fields.map((field, index) => ({
                label: field.label.trim(),
                type: field.type,
                required: field.required,
              })),
            },
          },
        });

        return reply.code(201).send(category);
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return reply.code(409).send({
            message: "Kategorinamnet används redan.",
          });
        }

        throw error;
      }
    },
  );
};

export default categoryRoutes;