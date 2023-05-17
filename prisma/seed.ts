import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const roles = [{ rolename: "admin" }, { rolename: "user" }]
const permissions = [{ permissionName: "view" }, { permissionName: "create" }, { permissionName: "edit" }, { permissionName: "delete" }]
async function seedRoleData() {
    for (let role of roles) {
        await prisma.roles.create({
            data: role
        })
    }
}
seedRoleData()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
async function seedPermissions() {
    for (let per of permissions) {
        await prisma.permissions.create({
            data: per
        })
    }
}

seedPermissions()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

