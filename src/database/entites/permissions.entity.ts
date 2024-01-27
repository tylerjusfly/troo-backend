import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { CustomBaseEntity } from '../custom-base.entity';

@Entity({ name: 'permissions' })
export class Permissions extends CustomBaseEntity {
	@Column({ type: 'varchar', length: 300, unique: true })
	name!: string;

	@Column({ type: 'varchar', nullable: true, unique: true })
	slug!: string;
}
