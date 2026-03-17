/*
  Warnings:

  - You are about to drop the column `playtime` on the `games` table. All the data in the column will be lost.
  - You are about to drop the `_EsrbRatingToGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameToGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameToPlatform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `esrb_rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `platforms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EsrbRatingToGame" DROP CONSTRAINT "_EsrbRatingToGame_A_fkey";

-- DropForeignKey
ALTER TABLE "_EsrbRatingToGame" DROP CONSTRAINT "_EsrbRatingToGame_B_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_GameToPlatform" DROP CONSTRAINT "_GameToPlatform_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToPlatform" DROP CONSTRAINT "_GameToPlatform_B_fkey";

-- DropIndex
DROP INDEX "games_rawg_id_slug_rating_idx";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "playtime",
ADD COLUMN     "esrbRatings" TEXT,
ADD COLUMN     "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "platforms" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "background_image" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "released" DROP NOT NULL;

-- DropTable
DROP TABLE "_EsrbRatingToGame";

-- DropTable
DROP TABLE "_GameToGenre";

-- DropTable
DROP TABLE "_GameToPlatform";

-- DropTable
DROP TABLE "esrb_rating";

-- DropTable
DROP TABLE "genres";

-- DropTable
DROP TABLE "platforms";

-- CreateIndex
CREATE INDEX "games_rating_idx" ON "games"("rating");
