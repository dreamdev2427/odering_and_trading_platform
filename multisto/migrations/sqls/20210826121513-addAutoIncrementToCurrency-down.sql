SET FOREIGN_KEY_CHECKS=0;
alter table currency modify column ID int(11) not null;
SET FOREIGN_KEY_CHECKS=1;