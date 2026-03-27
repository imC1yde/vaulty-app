-- DropIndex
DROP INDEX "items_id_user_id_idx";

-- AlterTable
ALTER TABLE "items" ADD CONSTRAINT "items_pkey" PRIMARY KEY ("id");
