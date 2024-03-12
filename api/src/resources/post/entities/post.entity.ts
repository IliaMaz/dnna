import { Column, Entity } from 'typeorm'
import { IdentifiableTimestamped } from '../../../common/entities/identifiable-timestamped.entity'

@Entity()
export class Post extends IdentifiableTimestamped {
    @Column({ length: 1024 })
    content: string
}
