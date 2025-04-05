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
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages,
    })

    return response
  }
}
