import { Post } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CrudController } from '../../common/crud/crud.controller'
import { Omit } from '../../common/decorators/omit/omit.decorator'
import { EmailService } from '../email/email.service'
import { PaymentProvider } from '../payment/enums/payment-provider.enum'
import { PaymentService } from '../payment/payment.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'
import { OrderService } from './order.service'

@Omit('findOne', 'remove', 'update', 'paginate')
export class OrderController extends CrudController<
    Order,
    CreateOrderDto,
    UpdateOrderDto
>('order', OrderService) {
    constructor(
        private readonly mailer: EmailService,
        private readonly config: ConfigService,
        private readonly payment: PaymentService
    ) {
        super()
    }

    @Post()
    async create() {
        const order = await super.create({})

        /**
         * We don't check for the payment status because on error
         * the payment service or gateways will throw an exception
         * which will update the status and bubble out avoiding
         * further execution.
         *
         * Check out the `payment.service.ts` for a small example of
         * the OCP - Open/Closed Principle.
         */
        await this.payment.process({
            order,
            provider: PaymentProvider.STRIPE
        })

        /**
         * SRP -- Single Responsibility Principle We don't send the
         * order email in the order service because it is out of the
         * scope of that service. Instead we call the email service
         * here in a more general scope.
         *
         * This mechanism is also an example of LSP -- Liskov
         * Substitution Principle wherein we can simply replace the
         * provider in the module to use different logic pertaining
         * to mailing. Read the `email-order.service.ts` for more
         * info.
         *
         * We don't await because the sendEmail method is currently
         * guaranteed to be non-throwable. Mail can be sent out in
         * the background and the response time in this case is
         * preferred. BEWARE, if the method is capable of throwing
         * an exception it can cause an application crash as NestJS
         * isn't exception filtering at that point.
         *
         * We're sending the email to ourselves so as not to spam
         * other people's inboxes and to avoid reputational penalties.
         */
        this.mailer.sendEmail({
            entityId: order.id,
            // Should never throw as this call is made in
            // the mailer factory on app.module load.
            receiver: this.config.getOrThrow('SMTP_USER')
        })

        return order
    }
}
