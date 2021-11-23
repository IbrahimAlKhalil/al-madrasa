import {Knex} from "knex";

export type ValidateDB = (db: Knex) => boolean | Promise<boolean>;
