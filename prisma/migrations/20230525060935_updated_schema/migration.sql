/*
  Warnings:

  - You are about to drop the `UserRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RolesPermissions` DROP FOREIGN KEY `RolesPermissions_permissionsId_fkey`;

-- DropForeignKey
ALTER TABLE `RolesPermissions` DROP FOREIGN KEY `RolesPermissions_rolesId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRoles` DROP FOREIGN KEY `UserRoles_rolesId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRoles` DROP FOREIGN KEY `UserRoles_userId_fkey`;

-- AlterTable
ALTER TABLE `Permissions` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `rolesId` INTEGER NOT NULL DEFAULT 2;

-- DropTable
DROP TABLE `UserRoles`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesPermissions` ADD CONSTRAINT `RolesPermissions_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesPermissions` ADD CONSTRAINT `RolesPermissions_permissionsId_fkey` FOREIGN KEY (`permissionsId`) REFERENCES `Permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
