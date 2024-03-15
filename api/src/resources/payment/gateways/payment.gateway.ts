import { PaymentStatus } from '../enums/payment-status.enum'

export abstract class PaymentGateway {
    /**
     * This method in reality would actually take a DTO to supply
     * necessary information to the payment service provider. This
     * method should only even throw HttpExceptions.
     */
    abstract processPayment(): Promise<PaymentStatus>
}
