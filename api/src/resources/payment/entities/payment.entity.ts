import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { IdentifiableTimestamped } from '../../../common/entities/identifiable-timestamped.entity'
import { PaymentProvider } from '../enums/payment-provider.enum'
import { Order } from '../../order/entities/order.entity'
import { PaymentStatus } from '../enums/payment-status.enum'

@Entity()
export class Payment extends IdentifiableTimestamped {
    @Column({
        type: 'enum',
        enum: PaymentProvider
    })
    provider: PaymentProvider

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    })
    status: PaymentStatus

    @JoinColumn()
    @OneToOne(() => Order, (order) => order.payment)
    order: Order
}
