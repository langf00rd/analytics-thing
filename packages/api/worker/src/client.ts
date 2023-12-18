import { Env } from './interface';
import { Client as LibsqlClient, createClient } from '@libsql/client/web';

export function buildLibSQLClient(env: Env): LibsqlClient {
	const url = env.LIBSQL_DB_URL?.trim();

	if (!url) {
		throw new Error('LIBSQL_DB_URL env var is not defined');
	}

	const jwtSecret = env.JWT_SECRET?.trim();

	if (!jwtSecret) {
		throw new Error('JWT_SECRET env var is not defined');
	}

	const authToken = env.LIBSQL_DB_AUTH_TOKEN?.trim();

	if (!authToken) {
		throw new Error('LIBSQL_DB_AUTH_TOKEN env var is not defined');
	}

	return createClient({ url, authToken });
}
