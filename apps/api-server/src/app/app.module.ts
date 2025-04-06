import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from '../config'
import { OpenaiModule } from './openai'
import { MockDataModule } from './mock-data'
import { NotificationModule } from './notifications/notification.module'

@Module({
  imports: [AppConfigModule, OpenaiModule, MockDataModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
