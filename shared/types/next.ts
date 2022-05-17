import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { GetServerSidePropsContext as Base } from 'next';
import { SiteSettings } from './site-settings';
import { IncomingMessage } from 'http';
import { Knex } from 'knex';

export interface GetServerSidePropsContext extends Base {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
    knex: Knex;
    masterDB: Knex;
    qmmsoftDB: {
      [key: string]: string | null;

      db_1: string | null;
      db_2: string | null;
      db_3: string | null;
      db_4: string | null;
    };
    siteSettings: SiteSettings;
    query: Record<string, any>;
    services: Record<string, any>;
    schema: any;
  };
}
