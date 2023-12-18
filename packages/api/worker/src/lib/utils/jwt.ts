import jwt from '@tsndr/cloudflare-worker-jwt';
import { IRequest } from 'itty-router';
import { Env } from '../../interface';

/**
 * generates a jwt for a given ID
 * @param id
 * @returns
 */
export async function generateJWT(id: string, env: Env) {
	try {
		const timestamp = new Date().toISOString();
		const token = await jwt.sign(
			{
				id,
				created_at: timestamp,
			},
			env.JWT_SECRET as string,
		);
		return Response.json({ data: { token, expires: false, created_at: timestamp } });
	} catch (error) {
		return handleError(error);
	}
}

/**
 * verifies the `authorization` header value
 * @param request - request object
 * @returns
 */
export async function verifyToken(request: IRequest, env: Env) {
	try {
		const authorizationToken = request.headers.get('authorization') as string;
		const isValidToken = await jwt.verify(authorizationToken, env.JWT_SECRET as string);
		if (!isValidToken) return Response.json({ error: 'unauthorized' }, { status: 401 });
	} catch (error) {
		return handleError(error);
	}
}

/**
 * handles error states
 * @param error
 * @returns Response
 */
function handleError(error: unknown) {
	return Response.json({ error: (error as { message: string }).message }, { status: 401 });
}
