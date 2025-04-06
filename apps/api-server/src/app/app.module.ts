import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from '../config'
import { OpenaiModule } from './openai'
import { MockDataModule } from './mock-data'

@Module({
  imports: [AppConfigModule, OpenaiModule, MockDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
