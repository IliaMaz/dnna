import { Res } from '@nestjs/common'

/**
 * NestJs Res decorator with passthrough set to true.
 *
 * Because injecting the Response object is quite common with auth and file
 * handling, this decorator comes in handy pretty often to avoid repetition.
 *
 * Named as such because otherwise you're looking at name repetition like:
 * `@PassthroughRes() res: Response`, `@Passthrough() res: Response` is sufficient.
 */
export const Passthrough = () => Res({ passthrough: true })
