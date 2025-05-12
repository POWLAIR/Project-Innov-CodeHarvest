/*
  Warnings:

  - The primary key for the `UserQuest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserQuest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserQuest" DROP CONSTRAINT "UserQuest_pkey",
DROP COLUMN "id",
ADD COLUMN     "repoUrl" TEXT,
ADD CONSTRAINT "UserQuest_pkey" PRIMARY KEY ("userId", "questId");
