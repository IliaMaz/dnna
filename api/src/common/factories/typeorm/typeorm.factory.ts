import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { EnvironmentService } from '../../services/environment/environment.service'

/**
 * Please note that this configuration doesn't sync production
 * builds as per the documentation of this option. Instead,
 * migrations should be used to keep the db in sync.
 */
export const typeOrmFactory = async (
    config: ConfigService,
    env: EnvironmentService
) => {
    return {
        type: 'postgres',
        host: config.getOrThrow('DB_HOST'),
        port: +config.get('DB_PORT') || 5432,
        username: config.getOrThrow('DB_USER'),
        password: config.getOrThrow('DB_PASS'),
        database: config.getOrThrow('DB_NAME'),
        synchronize: !env.isProduction(),
        autoLoadEntities: true
    } as TypeOrmModuleOptions
}
