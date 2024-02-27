const Joi =require('joi')

const authSchema=Joi.object({
    user_id:Joi.string().min(5).required(),
    password:Joi.string().min(8).required()
})

const signupSchema=Joi.object({
    name:Joi.string().min(3).required(),
    user_id:Joi.string().min(5).required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})



module.exports={
    authSchema,signupSchema
}