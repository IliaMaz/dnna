import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmFactory } from './common/factories/typeorm/typeorm.factory'

import { EnvironmentModule } from './common/services/environment/environment.module'
import { EnvironmentService } from './common/services/environment/environment.service'
import { PostModule } from './resources/post/post.module'

const applicationDefinedModules = [EnvironmentModule, PostModule]

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule, EnvironmentModule],
            useFactory: typeOrmFactory,
            inject: [ConfigService, EnvironmentService]
        }),

        ...applicationDefinedModules
    ]
})
export class AppModule {}
