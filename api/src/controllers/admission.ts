import asyncHandler from "../utils/async-handler";
import {respond} from "../middleware/respond";
import {Request, Router} from 'express';
import {pick} from 'lodash';
import Joi from 'joi';
// @ts-ignore
import ToUnicodePipe from 'shared/dist/modules/to-unicode';
import {UnprocessableEntityException} from "../exceptions";
import knex from "knex";
import {ConvertToASCII} from "../utils/bijoy/uni-2-bijoy";
const router = Router();

function getDBKey(req: Request): string {
	if (typeof req.query.db === 'string') {
		return req.query.db;
	}

	return 'db_1';
}

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
	const {value, error} = schema.validate(req.body);

	const db = getDBKey(req);

	if(!req.qmmsoftDB[db]) {
		throw new UnprocessableEntityException('DatabaseNotFound or UserBlocked')
	}

	if(error) {
		console.error(error);
		throw new UnprocessableEntityException('InvalidInput!')
	} else {
		const converted: Record<string, string | number> = {};

		for (const key in value) {
			if (value.hasOwnProperty(key)) {
				const element = value[key];
				if(typeof element === 'string') {
					converted[key] = ConvertToASCII(value[key]);
				} else {
					converted[key] = element;
				}
			}
		}

		const DB = database(req.qmmsoftDB[db] as string);
		await DB('OnlineRegistration')
			.insert({
				...converted,
				...pick(value, ['AbasikOnabasik', 'Gender', 'ClassID', 'SessionID', 'NationalID']),
			})
		await DB.destroy();
	}

	return next();
}), respond)

interface StudentData {
	FatherName: string;
	MotherName: string;
	StudentName: string;
	ID: number;
	Session: string;
	RegID?: number;
	RegDate?: string;
}

router.get('/:id', asyncHandler(async (req, res, next) => {
	const db = getDBKey(req);

	if (req.params.id && req.qmmsoftDB[db]) {
		const DB = database(req.qmmsoftDB[db] as string);
		const studentDtls = await DB('student').select(
			'StudentID',
			'SessionName',
			'StudentName',
			'FatherName',
			'MotherName',

		).where('StudentID', req.params.id);
		const studentRegistered = await DB('OnlineRegistration').select('ID','EntryDate')
			.where('StudentID', req.params.id)

		await DB.destroy();
		if (studentDtls) {
			const uniCode = new ToUnicodePipe();
			const stdntInfo: StudentData = {
				FatherName: uniCode.transform(studentDtls[0].FatherName),
				MotherName: uniCode.transform(studentDtls[0].MotherName),
				StudentName: uniCode.transform(studentDtls[0].StudentName),
				ID: studentDtls[0].StudentID,
				Session: studentDtls[0].SessionName
			}
			if (studentRegistered[0]) {
				stdntInfo.RegID = studentRegistered[0].ID
				stdntInfo.RegDate = studentRegistered[0].EntryDate.toLocaleDateString("bn-BD")
			}
			res.locals.payload = stdntInfo;
		}
	}
	return next();
}), respond)

router.post('/:id', asyncHandler(async (req, res, next) => {
	const db = getDBKey(req);

	if (req.params.id && req.qmmsoftDB[db]) {
		const DB = database(req.qmmsoftDB[db] as string);
		await DB('OnlineRegistration')
			.insert({'StudentID': req.params.id})
		await DB.destroy();
		res.locals.payload = {success: true}
	} else {
		res.locals.payload = {error: true}
	}
	return next();
}), respond)

export default router
