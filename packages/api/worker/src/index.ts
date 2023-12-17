import { Router, RouterType } from 'itty-router';
import { Env, IngestProps } from './interface';
import { v4 as uuidv4 } from 'uuid';
import { buildLibSQLClient } from './lib/build-db-client';
import { eventIngestSchema } from './lib/schema';
import formatString from './lib/utils/format-string';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (!env.router) env.router = buildRouter(env);
		return env.router.handle(request);
	},
};

function buildRouter(env: Env): RouterType {
	const router = Router();

	router.post('/events', async (request) => {
		try {
			const client = buildLibSQLClient(env);
			const body = (await request.json()) as IngestProps;
			const parsedBodyResult = eventIngestSchema.safeParse(body);

			if (!parsedBodyResult.success) return Response.json(parsedBodyResult.error.issues);

			const validatedRequestBody = parsedBodyResult.data;

			validatedRequestBody.id = uuidv4();
			validatedRequestBody.timestamp = new Date().toISOString();

			const result = await client.execute(
				`INSERT into events VALUES ('${validatedRequestBody.id}','${formatString(validatedRequestBody.event)}','${formatString(
					validatedRequestBody.project as string,
				)}','${formatString(validatedRequestBody.channel)}','${validatedRequestBody.description}','${JSON.stringify(
					validatedRequestBody.metadata ?? {},
				)}','${validatedRequestBody.timestamp}')`,
			);

			return Response.json(result);
		} catch (error) {
			return Response.json({ error: (error as { message: string }).message });
		}
	});

	router.get('/events/project/:projectID', async (request) => {
		try {
			const client = buildLibSQLClient(env);
			const result = await client.execute(`SELECT * from events where project = '${formatString(request.params.projectID)}'`);
			return Response.json(result);
		} catch (error) {
			return Response.json({ error: (error as { message: string }).message });
		}
	});

	router.get('/events/channel/:channelID', async (request) => {
		try {
			const client = buildLibSQLClient(env);
			const result = await client.execute(`SELECT * from events where channel = '${formatString(request.params.channelID)}'`);
			return Response.json(result);
		} catch (error) {
			return Response.json({ error: (error as { message: string }).message });
		}
	});

	router.all('*', () => new Response('Not Found.', { status: 404 }));

	return router;
}
