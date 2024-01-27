import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CustomBaseEntity } from '../custom-base.entity';
import { Permissions } from './permissions.entity';

@Entity({ name: 'roles' })
export class Role extends CustomBaseEntity {
	@Column({ type: 'varchar', length: 300 })
	name!: string;

	@Column({ type: 'varchar', length: 300 })
	slug!: string;

	@ManyToMany((type) => Permissions)
	@JoinTable()
	permissions!: Permissions[];
}
