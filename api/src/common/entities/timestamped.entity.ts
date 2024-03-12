import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class Timestamped {
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
