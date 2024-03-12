import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { EnvironmentService } from './common/services/environment/environment.service'

import helmet from 'helmet'

import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(helmet())

    // Hide the Express fingerprint
    app.getHttpAdapter().getInstance().disable('x-powered-by')

    const env = app.get(EnvironmentService)

    // Global validation pipe with sensible defaults
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: env.isProduction(),
            whitelist: true,
            transform: true,
            forbidUnknownValues: true
        })
    )

    app.setGlobalPrefix('api')

    const config = app.get(ConfigService)

    app.enableCors({
        origin: config.getOrThrow<string>('ORIGIN_WHITELIST').split(','),
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: 'GET,HEAD,PATCH,POST,DELETE'
    })

    app.use(cookieParser(config.getOrThrow('COOKIE_SECRET')))

    await app.listen(+config.getOrThrow('API_PORT'))
}

bootstrap()
