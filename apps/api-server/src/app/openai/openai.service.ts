/* eslint-disable max-lines */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import OpenAI from 'openai';

import { OpenaiConfig } from '../../config';

const fallbackMessage = "I'm sorry, I didn't quite get that. Could you rephrase it or let me know what you need help with?";

@Injectable()
export class OpenaiService {
  private openai!: OpenAI
  constructor(
    @Inject(OpenaiConfig.KEY)
    private readonly openaiConfig: ConfigType<typeof OpenaiConfig>,
  ) {
    this.init()
  }

  private init() {
    this.openai = new OpenAI({apiKey: this.openaiConfig.apiKey})
  }

  async chatCompletion(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    tools: OpenAI.Chat.Completions.ChatCompletionTool[]
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        temperature: 0.7,
        messages,
        tools
      })
  
      return response
    }
    catch (error) {
      // We can log the error here or handle it in a way that makes sense for your application
      console.error('Error in chatCompletion:', error)
      throw new Error(fallbackMessage)
    }
    
  }
}
