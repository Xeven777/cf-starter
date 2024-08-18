import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { stream, streamText } from 'hono/streaming';
import { events } from 'fetch-event-stream';

const app = new Hono();
app.use('/gemma', cors());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/', (c) => c.text('Hello Guyss! go to /gemma to use the API'));

app.get('/gemma', async (c) => {
	const question = c.req.query('q') || 'Hello , what can you do?';
	const messages = [
		{
			role: 'system',
			content: 'You are a helpful AI assistant. You can help me with anything, from answering questions to providing recommendations.',
		},
		{
			role: 'user',
			content: question,
		},
	];
	// @ts-expect-error
	const response = await (c.env as Env).AI.run('@hf/google/gemma-7b-it', { messages, stream: true });

	// return Response.json(response);
	return streamText(c, async (stream) => {
		const chunks = events(new Response(response));
		for await (const chunk of chunks) {
			if (chunk.data !== '[DONE]') {
				const data = JSON.parse(chunk.data?.toString() || '{}');
				stream.write(data.response);
			}
		}
	});
});

app.get('/qwen', async (c) => {
	const question = c.req.query('q') || 'Hello , what can you do?';
	const messages = [
		{
			role: 'system',
			content: 'You are a helpful AI assistant. You can help me with anything, from answering questions to providing recommendations.',
		},
		{
			role: 'user',
			content: question,
		},
	];
	// @ts-expect-error
	const response = await (c.env as Env).AI.run('@cf/qwen/qwen1.5-14b-chat-awq', { messages, stream: true });

	// return Response.json(response);
	return streamText(c, async (stream) => {
		const chunks = events(new Response(response));
		for await (const chunk of chunks) {
			if (chunk.data !== '[DONE]') {
				const data = JSON.parse(chunk.data?.toString() || '{}');
				stream.write(data.response);
			}
		}
	});
});

app.get('/llama', async (c) => {
	const question = c.req.query('q') || 'Hello , what can you do?';
	const messages = [
		{
			role: 'system',
			content: 'You are a helpful AI assistant. You can help me with anything, from answering questions to providing recommendations.',
		},
		{
			role: 'user',
			content: question,
		},
	];
	// @ts-expect-error
	const response = await (c.env as Env).AI.run('@cf/meta/llama-3.1-8b-instruct-awq', { messages, stream: true });

	// return Response.json(response);
	return streamText(c, async (stream) => {
		const chunks = events(new Response(response));
		for await (const chunk of chunks) {
			if (chunk.data !== '[DONE]') {
				const data = JSON.parse(chunk.data?.toString() || '{}');
				stream.write(data.response);
			}
		}
	});
});

app.get('/mistral', async (c) => {
	const question = c.req.query('q') || 'Hello , what can you do?';
	const messages = [
		{
			role: 'system',
			content: 'You are a helpful AI assistant. You can help me with anything, from answering questions to providing recommendations.',
		},
		{
			role: 'user',
			content: question,
		},
	];
	// @ts-expect-error
	const response = await (c.env as Env).AI.run('@cf/mistral/mistral-7b-instruct-v0.1', { messages, stream: true });

	// return Response.json(response);
	return streamText(c, async (stream) => {
		const chunks = events(new Response(response));
		for await (const chunk of chunks) {
			if (chunk.data !== '[DONE]') {
				const data = JSON.parse(chunk.data?.toString() || '{}');
				stream.write(data.response);
			}
		}
	});
});

export default app;
