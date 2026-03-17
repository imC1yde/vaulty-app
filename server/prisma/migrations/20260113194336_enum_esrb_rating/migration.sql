/*
  Warnings:

  - The `esrbRating` column on the `games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EsrbRating" AS ENUM ('EVERYONE', 'EVERYONE_10_PLUS', 'TEEN', 'MATURE', 'ADULTS_ONLY', 'RATING_PENDING');

-- AlterTable
ALTER TABLE "games" DROP COLUMN "esrbRating",
ADD COLUMN     "esrbRating" "EsrbRating";
