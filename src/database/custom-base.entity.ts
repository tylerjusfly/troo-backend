import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class CustomBaseEntity extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id!: number;

	// @DeleteDateColumn({ type: 'timestamp', nullable: true })
	// deleted_at!: Date;

	// @Column({ type: 'varchar', length: 300, nullable: true })
	// deleted_by!: string;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	created_at!: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updated_at!: Date;
}
