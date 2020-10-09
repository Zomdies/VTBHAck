import * as express from "express"
import * as multer from "multer"

export const imageFilter = (req : express.Request, file : Express.Multer.File, cb : multer.FileFilterCallback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true)
    } else {
      cb(null, false)
    }
}