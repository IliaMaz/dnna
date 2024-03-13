import { Entity, OneToOne } from 'typeorm'
import { IdentifiableTimestamped } from '../../../common/entities/identifiable-timestamped.entity'
import { EmailOrder } from '../../email/entities/email-order.entity'

@Entity()
export class Order extends IdentifiableTimestamped {
    @OneToOne(() => EmailOrder, (email) => email.order)
    email: EmailOrder
}
