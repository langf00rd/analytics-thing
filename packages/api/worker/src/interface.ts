import { RouterType } from 'itty-router';

export interface Env {
	LIBSQL_DB_AUTH_TOKEN?: string;
	LIBSQL_DB_URL?: string;
	JWT_SECRET?: string;
	router?: RouterType;
}

export interface IngestProps {
	event: string;
	project: string;
	channel: string;
	data: {
		[key: string]: unknown;
	};
}
