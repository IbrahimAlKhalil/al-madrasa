import asyncHandler from "../utils/async-handler";
import {respond} from "../middleware/respond";
import {Router} from 'express';
import Joi from 'joi';
import {UnprocessableEntityException} from "../exceptions";
const router = Router();

const schema = Joi.object({
	name: Joi.string().required().max(30),
	fatherName:  Joi.string().required().max(30),
	motherName: Joi.string().required().max(30),
	bloodGroup: Joi.string().pattern(/(A|B|AB|O)[+-]/),
	abasikAnabasik: Joi.number().required(),
	gender: Joi.number().required(),
	dateOfBirth: Joi.date().required(),
	class: Joi.string().required(),
	session: Joi.string().required(),
	nid: Joi.number().required(),
	residevillage: Joi.string().required(),
	residePost: Joi.string().required(),
	resideThana: Joi.string().required(),
	resideJela: Joi.string().required(),
	transientVillage: Joi.string().required(),
	transientPost: Joi.string().required(),
	transientThana: Joi.string().required(),
	transientJela: Joi.string().required(),
	email: Joi.string().email(),
})

router.post('/', asyncHandler((req, res, next) => {
	const {value, error} = schema.validate(req.body)
	if(error) {
		throw new UnprocessableEntityException('InvalidInput')
	} else {
		console.log(value)
	}
	return next();
}), respond)

export default router
