import { MailerService } from '@nestjs-modules/mailer'
import { Inject } from '@nestjs/common'
import { CrudService } from '../../common/crud/crud.service'
import { CreateEmailOrderDto } from './dto/order/create-email-order.dto'
import { UpdateEmailOrderDto } from './dto/order/update-email-order.dto'
import { EmailService } from './email.service'
import { EmailOrder } from './entities/email-order.entity'
import { Mail } from './interfaces/mail/mail.interface'

export class EmailOrderService
    extends CrudService<EmailOrder, CreateEmailOrderDto, UpdateEmailOrderDto>(
        EmailOrder
    )
    implements EmailService
{
    @Inject() private readonly mailer: MailerService

    async sendEmail(options: Mail): Promise<void> {
        try {
            const email = await this.create({
                order: { id: options.entityId }
            })

            // This segment doesn't focus on UX, it could actually
            // be made in a really neat fashion. The point of this
            // system is to showcase bits of code and concepts.

            // Assuming you use nodemailer overall you can then use
            // the transporterName prop to send the email using a
            // named transporter. For example, AWS SES. Our config
            // sets up a default instead but you can set it up with
            // `transports: [...]` instead of `transport: {...}`.
            await this.mailer.sendMail({
                to: options.receiver,
                subject: 'Order created',
                template: 'order',
                context: options.context
            })

            // Interface overlap allows us to just dump the full
            // email entity into the identifiable parameter. This
            // kind of logic can be dangerous but in the case of
            // the update logic it is safe, check `crud.service.ts`.
            await this.update(email, { delivered: true })
        } catch (error) {
            console.error('[ERROR] EmailOrderService::sendEmail ', error)
        }
    }
}
