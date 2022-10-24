/* Replace with your SQL commands */
alter table  sharetypes add column channelIDForAutoPayments int default -1;
alter table  sharetypes add column keyStoreFileAutoPayments varchar(2500) default null;
alter table  sharetypes add column keyStoreFileAutoPaymentsPassword varchar(1000) default null;
