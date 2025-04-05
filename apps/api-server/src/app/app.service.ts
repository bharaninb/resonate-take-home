import { Injectable } from '@nestjs/common'
import { OpenaiService } from './openai'
import OpenAI from 'openai';


const conversations: { [key: string]: OpenAI.Chat.Completions.ChatCompletionMessageParam[] } = {};


const SYSTEM_MESSAGE = `You are a friendly dental clinic assistant helping patients book appointments in a warm and human way. If unsure, gently ask for clarification. You can answer questions, provide information, and assist with various tasks. If you don't know the answer, it's okay to say you don't know. If you need more information, ask clarifying questions. If the user is rude or inappropriate, respond politely but firmly that such behavior is not acceptable.

The user can book the appointment from 8 AM to 6 PM from Monday to Saturday. Check if the time provided by the user is within the working hours then only you will proceed.`


@Injectable()
export class AppService {
  
  constructor(private readonly openaiService: OpenaiService) {}

  getData(): { message: string } {
    return { message: 'Hello API' }
  }

  async getChat(chatId: string, message: string): Promise<string> {

    if (!conversations[chatId]) {
      conversations[chatId] = [
        {
          role: 'system',
          content: SYSTEM_MESSAGE,
        },
      ]
    }
    conversations[chatId].push({
      role: 'user',
      content: message,
    })
    const response = await this.openaiService.chatCompletion(conversations[chatId])
    
    console.log(response.choices)
    return response.choices[0].message.content || ''
  }
}
