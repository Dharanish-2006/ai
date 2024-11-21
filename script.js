// let http = require('http')
import { createServer } from 'http';
import OpenAI from 'openai';
createServer((req,res) => {
	const openai = new OpenAI({
		apiKey: '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',
		baseURL: 'https://integrate.api.nvidia.com/v1',
	})
	async function main() {
		const completion = await openai.chat.completions.create({
		model: "nvidia/llama-3.1-nemotron-70b-instruct",
		messages: [{"role":"user","content":"Write a limerick about the wonders of GPU computing."}],
		temperature: 0.5,
		top_p: 1,
		max_tokens: 1024,
		stream: true,
	})

	for await (const chunk of completion) {
		res.write(chunk.choices[0]?.delta?.content || '')
	}

	}
	main();
})
.listen(3000)
