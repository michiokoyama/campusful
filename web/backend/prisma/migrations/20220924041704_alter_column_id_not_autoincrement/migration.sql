-- AlterTable
ALTER TABLE "Area" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Area_id_seq";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Category_id_seq";
