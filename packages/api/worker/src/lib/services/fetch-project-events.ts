import { Client } from '@libsql/client/web';
import formatString from '../utils/format-string';
/**
 * fetches events for a project
 * @param client - LibSQL client
 * @param projectID - project's ID
 * @returns Response
 */
export default async function fetchProjectEvents(client: Client, projectID: string) {
	try {
		const result = await client.execute(`SELECT * from events where project = '${formatString(projectID)}'`);
		return Response.json({ data: result.rows });
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
