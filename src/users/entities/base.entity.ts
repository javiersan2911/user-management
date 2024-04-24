import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_date_time',  type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdDateTime: Date;

    @Column({ nullable:true, name: 'created_by',  type: 'varchar', length: 300 })
    createdBy: string;

    @UpdateDateColumn({ name: 'last_changed_date_time',  type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @Column({ nullable:true, name: 'last_changed_by',  type: 'varchar', length: 300 })
    lastChangedBy: string;
}