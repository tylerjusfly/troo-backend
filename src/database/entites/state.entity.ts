import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../custom-base.entity';

@Entity({ name: 'states' })
export class State extends CustomBaseEntity {
	@Column({ type: 'varchar', unique: true, nullable: false })
	name!: string;

	// @Column({ type: 'boolean', default: false })
	// suscribed!: boolean;
}
