import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../custom-base.entity';

@Entity({ name: 'users' })
export class User extends CustomBaseEntity {
	@Column({ type: 'varchar' })
	fullname!: string;

	@Column({ type: 'varchar', default: 'basic_user' })
	user_type!: string;

	@Column({ type: 'varchar', nullable: false, unique: true })
	company!: string;

	@Column({ type: 'varchar', nullable: false, unique: true })
	company_slug!: string;

	@Column({ type: 'varchar', unique: true, nullable: false })
	email!: string;

	@Column({ type: 'varchar', nullable: true })
	telephone!: string;

	@Column({ type: 'boolean', default: false })
	active!: boolean;

	@Column({ type: 'varchar', nullable: true })
	token!: string;

	@Column({ nullable: false })
	password!: string;

	@Column({ nullable: false })
	salt!: string;
}
