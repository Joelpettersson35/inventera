import type { FastifyPluginAsync } from "fastify";
import { prisma } from "../lib/prisma.js";
import { request } from "node:http";

type CreateBoxBody = {
    name: string;
    shelfId: string;
}