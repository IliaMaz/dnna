import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvironmentModule } from './common/services/environment/environment.module'
import { EnvironmentService } from './common/services/environment/environment.service'
import { OrderModule } from './resources/order/order.module'
import { PostModule } from './resources/post/post.module'

import { mailerFactory } from './common/factories/mailer/mailer.factory'
import { typeOrmFactory } from './common/factories/typeorm/typeorm.factory'

const applicationDefinedModules = [EnvironmentModule, PostModule, OrderModule]

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule, EnvironmentModule],
            useFactory: typeOrmFactory,
            inject: [ConfigService, EnvironmentService]
        }),

        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: mailerFactory,
            inject: [ConfigService]
        }),

        ...applicationDefinedModules
    ]
})
export class AppModule {}
