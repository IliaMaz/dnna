import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { OmitGuard } from '../../guards/omit/omit.guard'
import { Method } from '../../unions/method/method.union'

export const Omitted = 'omitted'

/**
 * Class Decorator used to omit routes from the CRUD controller,
 * it applies the OmitGuard which emulates a non-existent route.
 */
export const Omit = (...methods: Method[]) => {
    return applyDecorators(SetMetadata(Omitted, methods), UseGuards(OmitGuard))
}
