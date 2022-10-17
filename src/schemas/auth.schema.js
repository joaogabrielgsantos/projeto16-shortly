import Joi from 'joi';


const newUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(1).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password')
});

const loginSchema = Joi.object({
    email: Joi.string().min(1).required(),
    password: Joi.string().min(6).required()
});



export { newUserSchema, loginSchema };