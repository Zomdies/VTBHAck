import * as multer from "multer"

export const createUpload = (path : string ,fileFilter: any) => {
    const storage = multer.diskStorage({
        destination: function (req : Express.Request, file : Express.Multer.File, cb : any) {
            cb(null, path);
        },
        filename: function (req :  Express.Request, file : Express.Multer.File, cb : any) {
            cb(null, Date.now() + file.originalname)
        }
    });
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    });
    return upload
}

