/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS polymeshKYCRequirements (
    id INT NOT NULL AUTO_INCREMENT,    
    title varchar(300) default null,
    keydata varchar(300) default null,
    keyvalue varchar(300) default null,  
    sharetypeid INT default null,      
    PRIMARY KEY (id) 
);

CREATE TABLE IF NOT EXISTS polymeshAccounts (
    id INT NOT NULL AUTO_INCREMENT,    
    title varchar(300) default null,
    mnemonic varchar(2000) default null,      
    PRIMARY KEY (id)   
);

alter table sharetypes add column polymeshAccountID INT default null;

alter table sharetypes add FOREIGN KEY (polymeshAccountID) REFERENCES polymeshAccounts(id) ON DELETE CASCADE;

alter table polymeshKYCRequirements add FOREIGN KEY (sharetypeid) REFERENCES sharetypes(id) ON DELETE CASCADE;

