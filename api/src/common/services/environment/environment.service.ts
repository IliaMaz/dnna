import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

/**
 * Generally this could be considered overkill but it ensures one approach
 * to knowing whether or not we are in a production environment.
 */
@Injectable()
export class EnvironmentService {
    constructor(private readonly config: ConfigService) {}

    isProduction() {
        return this.config.get('NODE_ENV') !== 'development'
    }
}
