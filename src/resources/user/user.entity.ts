import * as bcrypt from 'bcryptjs';
import {Length, IsNotEmpty} from 'class-validator';
import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 CreateDateColumn,
 UpdateDateColumn,
} from 'typeorm';

import {UserRoleType} from './user.interface';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
   id!: string;

  @Column()
  @Length(4, 20)
   username!: string;

  @Column({
   select: false,
  })
  @Length(4, 100)
   password!: string;

  @Column({
   type: 'enum',
   enum: UserRoleType,
   default: UserRoleType.USER,
  })
  @IsNotEmpty()
   role!: UserRoleType;

  @Column({
   default: true,
   select: false,
  })
   isActive?: boolean;

  @Column()
  @CreateDateColumn()
   createdAt!: Date;

  @Column()
  @UpdateDateColumn()
   updatedAt!: Date;

  hashPassword() {
   this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
   return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
