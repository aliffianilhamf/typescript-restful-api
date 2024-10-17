/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `token` VARCHAR(100) NULL,
    MODIFY `name` VARCHAR(100) NOT NULL;
