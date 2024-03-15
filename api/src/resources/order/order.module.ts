import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmailOrderService } from '../email/email-order.service'
import { EmailService } from '../email/email.service'
import { EmailOrder } from '../email/entities/email-order.entity'
import { PaymentModule } from '../payment/payment.module'
import { Order } from './entities/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

const OrderMailer = { provide: EmailService, useClass: EmailOrderService }

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, EmailOrder]),
        ConfigModule,
        PaymentModule
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderMailer]
})
export class OrderModule {}
