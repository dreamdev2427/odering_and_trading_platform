import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
class Timezone extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  timezone: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  timePadding: number;
}

export default Timezone;
