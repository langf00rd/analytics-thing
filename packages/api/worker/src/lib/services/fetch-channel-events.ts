import { Client } from '@libsql/client/web';
import formatString from '../utils/format-string';
/**
 * fetches all events for a channel
 * @param client - LibSQL client
 * @param channelID - channel
 * @returns Response
 */
export default async function fetchChannelEvents(client: Client, channelID: string) {
	try {
		const result = await client.execute(`SELECT * from events where channel = '${formatString(channelID)}'`);
		return Response.json({ data: result.rows });
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
