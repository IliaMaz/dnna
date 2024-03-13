import { Entity, JoinColumn, OneToOne } from 'typeorm'
import { Order } from '../../order/entities/order.entity'
import { Email } from './email.entity'

@Entity()
export class EmailOrder extends Email {
    @JoinColumn()
    @OneToOne(() => Order, (order) => order.email)
    order: Order
}
