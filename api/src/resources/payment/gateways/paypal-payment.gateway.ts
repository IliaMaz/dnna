import { PaymentStatus } from '../enums/payment-status.enum'
import { PaymentGateway } from './payment.gateway'

export class PaypalPaymentGateway implements PaymentGateway {
    async processPayment(): Promise<PaymentStatus> {
        return PaymentStatus.SUCCEEDED
    }
}
