import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Omitted } from '../../decorators/omit/omit.decorator'
import { Method } from '../../unions/method/method.union'

/**
 * Used by the Omit Decorator to prevent access to routes
 * while emulating the default behavior of a non-existent route.
 */
@Injectable()
export class OmitGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const methodsToOmit = this.reflector.getAllAndOverride<Method[]>(
            Omitted,
            [context.getHandler(), context.getClass()]
        )

        const handler = context.getHandler().name

        const request: Request = context.switchToHttp().getRequest()

        if (methodsToOmit.some((method) => handler.includes(method))) {
            throw new NotFoundException(
                'Cannot ' + request.method + ' ' + request.url
            )
        }

        return true
    }
}
