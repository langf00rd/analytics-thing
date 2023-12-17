import { z } from 'zod';

export const eventIngestSchema = z.object({
	id: z.string().uuid().optional(),
	timestamp: z.string().optional(),
	project: z.string().optional(),
	event: z.string(),
	description: z.string().optional(),
	channel: z.string(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});
