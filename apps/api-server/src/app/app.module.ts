import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from '../config'
import { OpenaiModule } from './openai'

@Module({
  imports: [AppConfigModule, OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
