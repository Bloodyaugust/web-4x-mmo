/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Empire` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `System` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `World` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Empire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empire" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empire_name_key" ON "Empire"("name");

-- CreateIndex
CREATE UNIQUE INDEX "System_name_key" ON "System"("name");

-- CreateIndex
CREATE UNIQUE INDEX "World_name_key" ON "World"("name");

-- AddForeignKey
ALTER TABLE "Empire" ADD CONSTRAINT "Empire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
