import { Injectable, NotImplementedException } from '@nestjs/common'
import { CrudService } from '../../common/crud/crud.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { Payment } from './entities/payment.entity'
import { PaymentProvider } from './enums/payment-provider.enum'
import { PaymentStatus } from './enums/payment-status.enum'
import { PaymentGateway } from './gateways/payment.gateway'
import { PaypalPaymentGateway } from './gateways/paypal-payment.gateway'
import { StripePaymentGateway } from './gateways/stripe-payment.gateway'

/**
 * This class holds an example of the OCP - Open Closed Principle,
 * the code under the method `process` after its finalisation needs
 * no further modification when it comes to adding new payment
 * providers. All that's needed is to add another one under the
 * `providers` map.
 */
@Injectable()
export class PaymentService extends CrudService<
    Payment,
    CreatePaymentDto,
    UpdatePaymentDto
>(Payment) {
    /**
     * Stripe and Paypal payment processing in actuality would probably
     * never be implemented via backend as they provide their own frontend
     * injectable components. Ignore the names.
     */
    private readonly providers = new Map<PaymentProvider, PaymentGateway>([
        [PaymentProvider.STRIPE, new StripePaymentGateway()],
        [PaymentProvider.PAYPAL, new PaypalPaymentGateway()]
    ])

    /**
     * Descoped from `process` to avoid generic and largely irrelevant logic
     * in the method.
     *
     * @throws {NotImplementedException}
     */
    private async getPaymentProviderOrThrow(
        provider: PaymentProvider
    ): Promise<PaymentGateway> {
        const gateway = this.providers.get(provider)

        if (!gateway) {
            throw new NotImplementedException()
        }

        return gateway
    }

    /**
     * In a real scenario we would have a much more complex DTO
     * as the parameter handling various cases like refunds, rejections,
     * etc. For the sake of simplicity, we're only handling the provider
     *
     * @throws {NotImplementedException and PaymentGateway Exceptions}
     */
    async process(dto: CreatePaymentDto): Promise<Payment> {
        const gateway = await this.getPaymentProviderOrThrow(dto.provider)

        const payment = await super.create(dto)

        // If updates to the payment status become more common
        // consider descoping this logic into a separate method

        const status = await gateway
            .processPayment()
            .catch(async (paymentError) => {
                await super.update(payment, {
                    status: PaymentStatus.FAILED
                })

                throw paymentError
            })

        // In the case of many crypto payment formats the status update will
        // have to wait due to a requirement for multiple chain confirmations
        if (status === PaymentStatus.SUCCEEDED)
            await super.update(payment, { status })

        return payment
    }
}
