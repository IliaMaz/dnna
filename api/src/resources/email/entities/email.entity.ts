import { Column } from 'typeorm'
import { IdentifiableTimestamped } from '../../../common/entities/identifiable-timestamped.entity'

/**
 * This entity exists for the purpose of derivation, please
 * refer to the `email-order.entity.ts` file for an example.
 */
export class Email extends IdentifiableTimestamped {
    @Column({ default: false })
    delivered: boolean
}
