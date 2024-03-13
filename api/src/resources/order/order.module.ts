import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { EmailService } from '../email/email.service'
import { EmailOrderService } from '../email/email-order.service'
import { EmailOrder } from '../email/entities/email-order.entity'
import { ConfigModule } from '@nestjs/config'

const OrderMailer = { provide: EmailService, useClass: EmailOrderService }

@Module({
    imports: [TypeOrmModule.forFeature([Order, EmailOrder]), ConfigModule],
    controllers: [OrderController],
    providers: [OrderService, OrderMailer]
})
export class OrderModule {}
