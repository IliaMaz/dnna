import { PaymentStatus } from '../enums/payment-status.enum'
import { PaymentGateway } from './payment.gateway'

export class StripePaymentGateway implements PaymentGateway {
    async processPayment(): Promise<PaymentStatus> {
        return PaymentStatus.SUCCEEDED
    }
}
