import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData()
  }

  @Post('chat/:chatId')
  async getChat(@Param('chatId') chatId: string, @Body() body: { message: string }) {
    return this.appService.getChat(chatId, body.message)
  }

}
