import type { FastifyPluginAsync } from "fastify";
import { prisma } from "../lib/prisma.js";

type CreateArticleBody = {
  name: string;
  quantity: number;
  description?: string;
  categoryId: string;
  attributes: Record<string, unknown>;
};

const articleRoutes: FastifyPluginAsync = async (app) => {
  // GET /api/articles
  app.get("/articles", async () => {
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
  app.get<{ Params: { id: string } }>("/:id", async (request, response) => {
    const article = await prisma.article.findUnique({
      where: {
        id: request.params.id,
      },
      include: {
        category: true,
      },
    });

    if (!article) {
      return response.code(404).send({
        message: "Artikeln hittades inte.",
      });
    }

    return article;
  });

  // POST /api/article
  app.post<{ Body: CreateArticleBody }>(
    "/article",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "quantity", "categoryId", "attributes"],
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
            attributes: {
              type: "object",
              additionalProperties: {}
            }
          },
        },
      },
    },
    async (request, response) => {
      const { name, quantity, description, categoryId, attributes } = request.body;

      if (!name.trim()) {
        return response.code(400).send({
          message: "Artikelnamn saknas.",
        });
      }

      //kolla om inkommande kategoriID finns 
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
        include: {
          fields: true
        }
      });

      if (!category) {
        return response.code(400).send({
          message: "Angivet kategori-ID finns inte.",
        });
      }

      if(quantity < 0 || quantity > 500){
        return response.code(400).send({message: "Saldo måste vara mellan 0-500"});
      }

      if(description && description.length > 500){
        return response.code(400).send({message: "Angiven beskriven är över 500 tecken"});
      }

      const allowedFieldIds = new Set(category.fields.map((field) => field.id),); //tillåtna fält på aktuell kategori

      //Kontrollerar om alla inkommande fält faktiskt finns på aktuell kategori
      //NOTE ett fält kan förekomma som dublett i anropet, inget problem just nu, det är sista förekomsten som gäller
      for(const fieldId of Object.keys(attributes)){
        if(!allowedFieldIds.has(fieldId)){
          console.log(fieldId);
          return response.code(400).send({message: "Ett fält-id ingår inte i denna kategori"});
        }
      }

      const validatedFields: Record<string, string | number | boolean> = {};
      for(const field of category.fields){
        const value = attributes[field.id];

        const isEmpty =
            value === undefined || // Fältet saknas.
            value === null ||      // Fältet har uttryckligen inget värde.
            (typeof value === "string" && value.trim() === ""); // Fältet innehåller tom text eller bara whitespace.

        if(isEmpty && field.required){
          return response.code(400).send({message: ` Fyll i "${field.label}"`,});
        }

        switch(field.type){
          case "TEXT":
            if(typeof value !== "string"){
              return response.code(400).send({message: field.label + " måste vara text"});
            }
            validatedFields[field.id] = value.trim();
            break;
          
          case "NUMBER":
            if (typeof value !== "number" || !Number.isFinite(value)) {
              return response.code(400).send({message: `"${field.label}" måste vara ett giltigt tal.`,});
            }
            validatedFields[field.id] = value;
            break;
          
          case "BOOLEAN":
            if(typeof value !== "boolean"){
              return response.code(400).send({message: `"${field.label}" saknar giltigt värde.`,});
            }
            validatedFields[field.id] = value;
            break;
        }
      }

      const article = await prisma.article.create({
        data: {
          name: name.trim(),
          quantity,
          description: description?.trim() ?? "",
          categoryId,
          attributes: validatedFields
        },
        include: {
          category: true,
        },
      });

      return response.code(201).send(article);
    },
  );
};

export default articleRoutes;