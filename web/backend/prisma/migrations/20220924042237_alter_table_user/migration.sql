/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('Man', 'Woman', 'Other');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "gender" "GenderType",
ADD COLUMN     "lastName" TEXT;
