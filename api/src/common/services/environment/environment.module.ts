import { Module } from '@nestjs/common'
import { EnvironmentService } from './environment.service'
import { ConfigService } from '@nestjs/config'

@Module({
    providers: [ConfigService, EnvironmentService],
    exports: [EnvironmentService]
})
export class EnvironmentModule {}
