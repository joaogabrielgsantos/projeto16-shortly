import { STATUS_CODE } from "../enums/statusCode.js";
import { urlSchema } from "../schemas/urls.schema.js";



function validateNewUrl(req, res, next) {

    const { url } = req.body
    const newUrl = { url }


    const validation = urlSchema.validate(newUrl, {
        abortEarly: false,
    });

    const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/


    

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errors);
    }

    if (regex.test(url) === false){
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send("URL inválida")
    }



    next()
}


export { validateNewUrl}