import { IngestProps } from '../../interface';
import { eventIngestSchema } from '../schema';
import formatString from '../utils/format-string';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '@libsql/client/web';
/**
 * ingests an event into the database
 * @param body - request body
 * @param client - LibSQL client
 * @returns Response
 */
export default async function ingest(body: IngestProps, client: Client) {
	try {
		const parsedBodyResult = eventIngestSchema.safeParse(body);

		if (!parsedBodyResult.success) {
			return new Response(JSON.stringify(parsedBodyResult.error.issues), { status: 400 });
		}

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
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
