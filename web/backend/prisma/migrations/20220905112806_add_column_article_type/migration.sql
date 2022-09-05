-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('Article', 'Question');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "type" "ArticleType";
