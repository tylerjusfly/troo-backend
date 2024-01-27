import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CustomBaseEntity } from '../custom-base.entity';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User extends CustomBaseEntity {
	@Column({ type: 'varchar' })
	fullname!: string;

	@Column({ type: 'varchar', default: 'basic_user' })
	user_type!: string;

	@Column({ type: 'varchar', nullable: false })
	company!: string;

	@Column({ type: 'varchar', nullable: false })
	company_slug!: string;

	@Column({ type: 'varchar', unique: true, nullable: false })
	email!: string;

	@Column({ type: 'varchar', nullable: true })
	telephone!: string;

	@Column({ nullable: false })
	password!: string;

	@Column({ nullable: false })
	salt!: string;

	@ManyToOne(() => Role, { nullable: true, eager: true })
	@JoinColumn({ name: 'role_id' })
	role_id!: Role;
}
