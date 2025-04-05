import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { OpenaiConfig } from './openai.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        OpenaiConfig,
      ],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class AppConfigModule {}
