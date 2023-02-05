/*
  Warnings:

  - You are about to drop the column `complexId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Complex` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Complex` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_complexId_fkey";

-- DropIndex
DROP INDEX "User_complexId_key";

-- AlterTable
ALTER TABLE "Complex" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "complexId";

-- CreateIndex
CREATE UNIQUE INDEX "Complex_userId_key" ON "Complex"("userId");

-- AddForeignKey
ALTER TABLE "Complex" ADD CONSTRAINT "Complex_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
