import * as express from "express"

export const sendMessage200 = (res: express.Response, status: number = 200, message?: string, result?: object) => {
        return res.status(200).json({
            status: status,
            message: message,
            result: result
        })
}
export const sendMessage404 = (res: express.Response, status: number = 404, message?: string, result?: object) => {
    return res.status(404).json({
        status: status,
        message: message,
        result: result
    })
}
export const sendError500 = (res: express.Response, status: number = 500, message?: string, error?: string) => {
    return res.status(500).json({
        status: status,
        message: message,
        error: error
    })
}