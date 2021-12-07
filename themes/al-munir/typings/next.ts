import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { GetServerSidePropsContext as Base } from 'next';
import { SiteSettings } from 't/site-settings';
import { IncomingMessage } from 'http';
import { Knex } from 'knex';

export interface GetServerSidePropsContext extends Base {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
    knex: Knex;
    masterDB: Knex;
    siteSettings: SiteSettings;
  };
}
