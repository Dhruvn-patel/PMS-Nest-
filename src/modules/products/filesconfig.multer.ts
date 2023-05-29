/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { extname } from "path"

export const editFileName = (req, file, callback) => {

    const name = file.originalname.split('.')[0]
    const fileExtensionName = extname(file.originalname)
    const randomeName = Date.now()
    callback(null, randomeName + "-" + name + fileExtensionName)
}

export const imageFileFilter = (req, file, cb) => {
    let allowtype = [".jpg", ".png", ".jpeg"];
    const ext = extname(file.originalname).toLowerCase()
    if (allowtype.includes(ext)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file "));
    }
}
export const destination = (req, file, cb) => {
    cb(null, "./public/uploads")
}