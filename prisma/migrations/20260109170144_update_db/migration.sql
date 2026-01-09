/*
  Warnings:

  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'WONT_DO');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'IN_PROGRESS';
