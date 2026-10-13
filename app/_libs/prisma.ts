import { PrismaClient } from "@prisma/client";
import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSQLite3({
  url: "file:./dev.db",
});

export const prisma = new PrismaClient({ adapter });
