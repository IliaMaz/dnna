import { Injectable } from '@nestjs/common'
import { CrudService } from '../../common/crud/crud.service'
import { Order } from './entities/order.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrderService extends CrudService<
    Order,
    CreateOrderDto,
    UpdateOrderDto
>(Order) {}
