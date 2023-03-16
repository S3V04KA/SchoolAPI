/*
  Warnings:

  - You are about to drop the column `AccountNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Sex` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_roleId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "AccountNumber",
DROP COLUMN "Address",
DROP COLUMN "Sex",
DROP COLUMN "balance";

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_id_key" ON "Role"("role", "id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_roleId_fkey" FOREIGN KEY ("role", "roleId") REFERENCES "Role"("role", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
