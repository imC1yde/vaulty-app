/*
  Warnings:

  - You are about to alter the column `name` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `description` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1024)`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "name" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1024);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(32);
