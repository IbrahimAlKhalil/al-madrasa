import {isTemplate} from "./is-template";
import {isMaster} from "./is-master";
import {Knex} from "knex";

export function isMasterOrTemplate(database: Knex) {
	return isMaster(database) || isTemplate(database);
}
