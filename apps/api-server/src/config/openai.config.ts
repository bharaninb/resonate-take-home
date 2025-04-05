import { registerAs } from '@nestjs/config'

export const OpenaiConfig = registerAs('openai', () => ({
  apiKey: process.env.OPENAI_API_KEY,
}))
