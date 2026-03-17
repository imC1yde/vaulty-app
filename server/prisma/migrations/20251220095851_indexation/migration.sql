/*
  Warnings:

  - The primary key for the `_EsrbRatingToGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_GameToGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_GameToPlatform` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_GameToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_EsrbRatingToGame` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_GameToGenre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_GameToPlatform` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_GameToUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_EsrbRatingToGame" DROP CONSTRAINT "_EsrbRatingToGame_AB_pkey";

-- AlterTable
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_AB_pkey";

-- AlterTable
ALTER TABLE "_GameToPlatform" DROP CONSTRAINT "_GameToPlatform_AB_pkey";

-- AlterTable
ALTER TABLE "_GameToUser" DROP CONSTRAINT "_GameToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_EsrbRatingToGame_AB_unique" ON "_EsrbRatingToGame"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGenre_AB_unique" ON "_GameToGenre"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToPlatform_AB_unique" ON "_GameToPlatform"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameToUser_AB_unique" ON "_GameToUser"("A", "B");
