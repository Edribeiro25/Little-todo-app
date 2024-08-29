/*
  Warnings:

  - You are about to drop the column `desciption` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `desciption`,
    ADD COLUMN `description` VARCHAR(191) NULL;
