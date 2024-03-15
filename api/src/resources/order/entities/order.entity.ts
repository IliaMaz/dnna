import { Entity, OneToOne } from 'typeorm'
import { IdentifiableTimestamped } from '../../../common/entities/identifiable-timestamped.entity'
import { EmailOrder } from '../../email/entities/email-order.entity'
import { Payment } from '../../payment/entities/payment.entity'

@Entity()
export class Order extends IdentifiableTimestamped {
    @OneToOne(() => EmailOrder, (email) => email.order)
    email: EmailOrder

    @OneToOne(() => Payment, (payment) => payment.order)
    payment: Payment
}
