import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type { Post, User } from "@prisma/client";