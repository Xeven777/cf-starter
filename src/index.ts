import { cors } from 'hono/cors';
import { Hono } from 'hono';

const app = new Hono();
app.use(cors());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/', (c) => c.text('Hello Guyss! go to /gemma, /qwen, /phi, /llama, /mistral to use the API'));

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
	const response = await (c.env as Env).AI.run('@hf/google/gemma-7b-it', { messages });

	return Response.json(response);
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
	const response = await (c.env as Env).AI.run('@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', { messages });

	return Response.json(response);
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
	const response = await (c.env as Env).AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', { messages });

	return Response.json(response);
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
	const response = await (c.env as Env).AI.run('@hf/mistral/mistral-7b-instruct-v0.2', { messages });

	return Response.json(response);
});

app.get('/phi', async (c) => {
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
	const response = await (c.env as Env).AI.run('@cf/microsoft/phi-2', { messages });

	return Response.json(response);
});

export default app;
