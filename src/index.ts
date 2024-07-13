import { cors } from 'hono/cors';
import { Hono } from 'hono';

const app = new Hono();
app.use('/t', cors());
app.use('/lorem', cors());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/', (c) => c.text('Hello Guyss! go to /t to use the API'));

app.get('/t', async (c) => {
	const messages = [
		{
			role: 'system',
			content:
				'You are a motivational speaker. You will give inspirational, optimistic, motivational and uplifting quotes. Return only the random quote and nothing else.',
		},
		{
			role: 'user',
			content: 'say me a quote.Return any 1 quote.',
		},
	];
	// @ts-expect-error
	const response = await (c.env as Env).AI.run('@hf/google/gemma-7b-it', { messages });

	return Response.json(response);
});

app.get('/lorem', async (c) => {
	const limit = c.req.query('l') || 50;
	const messages = [
		{
			role: 'system',
			content:
				'You are a random essay text generator. You will generate random text in English Language (not latin) , which sounds simple but doest mean anything sense. Return only the random text and nothing else.',
		},
		{
			role: 'user',
			content: 'Give me dummy text of ' + limit + ' words.',
		},
	];
	// @ts-expect-error
	const response = await (c.env as Env).AI.run('@cf/meta/llama-3-8b-instruct', { messages });

	return Response.json(response);
});

export default app;
