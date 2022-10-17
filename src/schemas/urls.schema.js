import Joi from 'joi';


const urlSchema = Joi.object({
    url: Joi.string().min(1).required(),
});


export { urlSchema }