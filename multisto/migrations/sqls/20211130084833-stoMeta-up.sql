CREATE TABLE `stosMetaKeys` (
  `key` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`key`));

CREATE TABLE `stosMetaValues` (
  `stoID` INT NOT NULL,
  `key` VARCHAR(255) NOT NULL,
  `value` LONGTEXT NOT NULL,
  PRIMARY KEY (`stoID`, `key`),
  INDEX `metakeyfk_idx` (`key` ASC),
  CONSTRAINT `stofk`
    FOREIGN KEY (`stoID`)
    REFERENCES `stos` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `metakeyfk`
    FOREIGN KEY (`key`)
    REFERENCES `stosMetaKeys` (`key`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
