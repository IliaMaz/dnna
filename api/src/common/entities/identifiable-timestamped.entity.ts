import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { Identifiable } from './identifiable.entity'
import { Timestamped } from './timestamped.entity'

/**
 * Generic base class to be extended by most entities
 */
export class IdentifiableTimestamped implements Identifiable, Timestamped {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
