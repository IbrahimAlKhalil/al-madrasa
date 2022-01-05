import {ForbiddenException, InvalidPayloadException} from '../exceptions';
import {isMaster} from '../database/helpers/is-master';
import asyncHandler from '../utils/async-handler';
import {respond} from '../middleware/respond';
import {ItemsService} from '../services';
import {Router} from 'express';
import Joi from 'joi';

const router = Router();

const contactSchema = Joi.object({
	name: Joi.string().max(255).required(),
	email: Joi.string().max(255).email().required(),
	message: Joi.string().max(10000).required(),
	questionType: Joi.number().required(),
});

router.post('/', asyncHandler(async (req, res, next) => {
	//console.log(req.body);

	if (isMaster(req.knex)) {
		throw new ForbiddenException();
	}

	const {value, error} = contactSchema.validate(req.body);

	if (error) {
		throw new InvalidPayloadException(error.message);
	}

	const serviceOptions = {
		knex: req.knex,
		schema: req.schema
	};

	const questionService = new ItemsService('question', serviceOptions);
	const questionTypeService = new ItemsService('question_type', serviceOptions);

	const questionType = await questionTypeService.readOne(value.questionType);

	if (!questionType) {
		throw new ForbiddenException();
	}

	await questionService.createOne({
		name: value.name,
		email: value.email,
		question_type: value.questionType,
		question: value.message,
	});

	res.locals.payload = {
		success: true,
	};

	next();
}), respond);

export default router;
