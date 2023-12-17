import { Client } from '@libsql/client/web';
import formatString from '../utils/format-string';

export default async function fetchProjectEvents(client: Client, projectID: string) {
	try {
		const result = await client.execute(`SELECT * from events where project = '${formatString(projectID)}'`);
		return Response.json({ data: result.rows });
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
