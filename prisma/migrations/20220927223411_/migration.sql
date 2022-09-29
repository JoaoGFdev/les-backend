/*
  Warnings:

  - You are about to drop the column `locationId` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_locationId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "locationId",
ADD COLUMN     "location" TEXT;