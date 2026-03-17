/*
  Warnings:

  - You are about to drop the column `esrbRatings` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "esrbRatings",
ADD COLUMN     "esrbRating" TEXT;
