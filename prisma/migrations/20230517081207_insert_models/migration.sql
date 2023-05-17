-- AlterTable
ALTER TABLE `UserRoles` ADD COLUMN `rolesId` INTEGER NULL;

-- CreateTable
CREATE TABLE `RolesPermissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rolesId` INTEGER NULL,
    `permissionsId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesPermissions` ADD CONSTRAINT `RolesPermissions_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesPermissions` ADD CONSTRAINT `RolesPermissions_permissionsId_fkey` FOREIGN KEY (`permissionsId`) REFERENCES `Permissions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
