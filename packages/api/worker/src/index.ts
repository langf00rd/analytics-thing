import { Env } from './interface';
import { routeBuilder } from './router';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (!env.router) env.router = routeBuilder(env);
		return env.router.handle(request);
	},
};
