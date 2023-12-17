import { Router, RouterType } from 'itty-router';
import { Env } from './lib/interface';
import { buildLibSQLClient } from './lib/build-db-client';
import createEvent from './lib/actions/create-event';
import fetchChannelEvents from './lib/actions/fetch-channel-events';
import fetchProjectEvents from './lib/actions/fetch-project-events';

export function routeBuilder(env: Env): RouterType {
	const router = Router();
	const client = buildLibSQLClient(env);

	router.post('/events', async (request) => await createEvent(request, client));
	router.get('/events/projects/:projectID', async (request) => await fetchProjectEvents(client, request.params.projectID));
	router.get('/events/channels/:channelID', async (request) => await fetchChannelEvents(client, request.params.channelID));
	router.all('*', () => new Response('Not Found.', { status: 404 }));

	return router;
}
