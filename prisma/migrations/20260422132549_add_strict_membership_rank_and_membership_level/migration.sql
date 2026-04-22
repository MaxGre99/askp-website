/*
  Warnings:

  - Made the column `membershipLevel` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "membershipLevel" SET NOT NULL,
ALTER COLUMN "membershipRank" DROP DEFAULT;
