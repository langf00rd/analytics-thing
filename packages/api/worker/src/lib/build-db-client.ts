import { Env } from '../interface';
import { Client as LibsqlClient, createClient } from '@libsql/client/web';

export function buildLibSQLClient(env: Env): LibsqlClient {
	const url = env.LIBSQL_DB_URL?.trim();

	if (url === undefined) {
		throw new Error('LIBSQL_DB_URL env var is not defined');
	}

	const authToken = env.LIBSQL_DB_AUTH_TOKEN?.trim();

	if (authToken === undefined) {
		throw new Error('LIBSQL_DB_AUTH_TOKEN env var is not defined');
	}

	return createClient({ url, authToken });
}
