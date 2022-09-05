/*
  Warnings:

  - You are about to drop the column `thnaksNum` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "thnaksNum",
ADD COLUMN     "thanksNum" INTEGER DEFAULT 0;
