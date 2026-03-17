/*
  Warnings:

  - The values [EVERYONE,EVERYONE_10_PLUS,TEEN,MATURE,ADULTS_ONLY,RATING_PENDING] on the enum `EsrbRating` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EsrbRating_new" AS ENUM ('Everyone', 'Everyone 10+', 'Teen', 'Mature', 'Adults Only', 'Rating Pending');
ALTER TABLE "games" ALTER COLUMN "esrbRating" TYPE "EsrbRating_new" USING ("esrbRating"::text::"EsrbRating_new");
ALTER TYPE "EsrbRating" RENAME TO "EsrbRating_old";
ALTER TYPE "EsrbRating_new" RENAME TO "EsrbRating";
DROP TYPE "EsrbRating_old";
COMMIT;
