import { Injectable } from '@nestjs/common'
import { CrudService } from '../../common/crud/crud.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrderService extends CrudService<
    Order,
    CreateOrderDto,
    UpdateOrderDto
>(Order) {}
