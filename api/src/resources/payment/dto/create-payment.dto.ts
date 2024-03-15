import { Order } from '../../order/entities/order.entity'
import { PaymentProvider } from '../enums/payment-provider.enum'

export class CreatePaymentDto {
    order: Order
    provider: PaymentProvider
}
