import type { FastifyPluginAsync } from "fastify";
import { prisma } from "../lib/prisma.js";

type CreateArticleBody = {
  name: string;
  quantity: number;
  description?: string;
  categoryId: string;
};

const articleRoutes: FastifyPluginAsync = async (app) => {
  // GET /api/articles
  app.get("/", async () => {
    return prisma.article.findMany({
      include: {
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  });

  // GET /api/articles/:id
  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const article = await prisma.article.findUnique({
      where: {
        id: request.params.id,
      },
      include: {
        category: true,
      },
    });

    if (!article) {
      return reply.code(404).send({
        message: "Artikeln hittades inte.",
      });
    }

    return article;
  });

  // POST /api/articles
  app.post<{ Body: CreateArticleBody }>(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "quantity", "categoryId"],
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 200,
            },
            quantity: {
              type: "integer",
              minimum: 0,
            },
            description: {
              type: "string",
              maxLength: 5000,
            },
            categoryId: {
              type: "string",
              minLength: 1,
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, quantity, description, categoryId } = request.body;

      if (!name.trim()) {
        return reply.code(400).send({
          message: "Artikelnamn saknas.",
        });
      }

      //kolla om inkommande kategoriID finns 
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        return reply.code(400).send({
          message: "Angivet kategori-ID finns inte.",
        });
      }

      const article = await prisma.article.create({
        data: {
          name: name.trim(),
          quantity,
          description: description?.trim() ?? "",
          categoryId,
        },
        include: {
          category: true,
        },
      });

      return reply.code(201).send(article);
    },
  );
};

export default articleRoutes;