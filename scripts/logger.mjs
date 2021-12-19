import prettifier from 'pino-colada';
import pino from 'pino';

export const logger = pino({
    prettyPrint: true,
    prettifier,
});
