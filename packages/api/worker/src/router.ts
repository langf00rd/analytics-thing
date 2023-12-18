import { Router, RouterType } from 'itty-router';
import { Env } from './interface';
import { buildLibSQLClient } from './client';
import ingest from './lib/services/create-event';
import fetchChannelEvents from './lib/services/fetch-channel-events';
import fetchProjectEvents from './lib/services/fetch-project-events';
import { generateJWT, verifyToken } from './lib/utils/jwt';

export function routeBuilder(env: Env): RouterType {
	const router = Router();
	const client = buildLibSQLClient(env);

	router.post(
		'/events',
		async (request) => await verifyToken(request, env),
		async (request) => await ingest(await request.json(), client),
	);

	router.post(
		'/events/projects/:projectID',
		async (request) => await verifyToken(request, env),
		async (request) => await fetchProjectEvents(client, request.params.projectID),
	);

	router.post(
		'/events/channels/:channelID',
		async (request) => await verifyToken(request, env),
		async (request) => await fetchChannelEvents(client, request.params.channelID),
	);

	router.post('/tokens/:id', async (request) => await generateJWT(request.params.id, env));

	router.all('*', () => Response.json({ error: 'not found' }, { status: 404 }));

	return router;
}
