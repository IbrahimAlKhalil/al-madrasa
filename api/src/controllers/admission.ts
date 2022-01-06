import asyncHandler from "../utils/async-handler";
import {respond} from "../middleware/respond";
import {Router} from 'express';
import Joi from 'joi';
import {UnprocessableEntityException} from "../exceptions";
import knex from "knex";
const router = Router();


//ms sql config
// const sqlConfig =(dbName: string) => ({
// 	user: process.env.DB_MSSQL_USER as string,
// 	password: process.env.DB_MSSQL_HOST as string,
// 	database: dbName,
// 	server: process.env.DB_MSSQL_HOST as string,
// 	port: Number(process.env.DB_MSSQL_PORT),
// 	Encr
// })

const database = (dbName: string) => knex({
	client: 'mssql',
	connection: {
		server: process.env.DB_MSSQL_HOST as string,
		user: process.env.DB_MSSQL_USER as string,
		password: process.env.DB_MSSQL_PASSWORD as string,
		database: dbName,
		port: Number(process.env.DB_MSSQL_PORT),
	},
});

// validator
const schema = Joi.object({
	StudentName: Joi.string().required().max(30),
	FatherName:  Joi.string().required().max(30),
	MotherName: Joi.string().required().max(30),
	BloodGroup: Joi.string().pattern(/(A|B|AB|O)[+-]/),
	AbasikOnabasik: Joi.number().required(),
	Gender: Joi.number().required(),
	DateOfBirth: Joi.date().required(),
	ClassID: Joi.number().required(),
	SessionID: Joi.number().required(),
	NationalID: Joi.number().required(),
	ResideVill: Joi.string().required(),
	ResidePost: Joi.string().required(),
	ResideThana: Joi.string().required(),
	ResideJela: Joi.string().required(),
	TransientVill: Joi.string().required(),
	TransientPost: Joi.string().required(),
	TransientThana: Joi.string().required(),
	TransientJela: Joi.string().required(),
	Mobile1: Joi.string().required(),
	Mobile2: Joi.string().required(),
	Reletion1: Joi.string().required(),
	Reletion2: Joi.string().required(),
})


router.post('/',  asyncHandler(async (req, res, next) => {
	const {value, error} = schema.validate(req.body)
	if(!req.qmmsoftDB) {
		throw new UnprocessableEntityException('DatabaseNotFound or UserBlocked')
	}

	if(error) {
		console.log(error)
		throw new UnprocessableEntityException('InvalidInput')
	} else {
		console.log(value)
		const DB = database(req.qmmsoftDB);
		await DB('Student_OnlineRegistration')
			.insert(value)
		await DB.destroy();
	}

	return next();
}), respond)

export default router
