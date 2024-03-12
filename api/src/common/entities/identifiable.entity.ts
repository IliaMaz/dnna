import { PrimaryGeneratedColumn } from 'typeorm'

export abstract class Identifiable {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
