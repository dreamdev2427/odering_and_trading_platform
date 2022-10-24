import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('changepassword')
class ChangePassword extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  ID: number;

  @Column({
    type: 'int',
    name: 'userid',
  })
  userID: number;

  @Column({
    type: 'date',
  })
  date: Date;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  securelink: string;

  @Column({
    type: 'varchar',
    length: 15,
  })
  securecode: string;
}

export default ChangePassword;
