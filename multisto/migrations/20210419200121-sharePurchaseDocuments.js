'use strict';

var dbm;
var type;
var seed;
const createSharePurchaseDocuments=`
CREATE TABLE sharePurchaseDocuments (
  ID int(11) NOT NULL,
  requireOnce tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
const deleteSharePurchaseDocuments=`
DROP TABLE sharePurchaseDocuments;
`;
const createSubmittedSharePurchaseDocuments=`
CREATE TABLE submittedSharePurchaseDocuments (
  sharePurchaseRequestID int(11) NOT NULL,
  submittedDocumentID varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (sharePurchaseRequestID,submittedDocumentID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
const deleteSubmittedSharePurchaseDocuments=`
DROP TABLE submittedSharePurchaseDocuments;
`;
const insertParam=`
insert into params(param,isglobal,datatype,stringValue,intValue) values ('sharePurchaseDocumentsMode',1,1,'docusign',0);
`; //set stringValue to 'internal'

const deleteParam=`delete from params where param='sharePurchaseDocumentsMode';
`;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return Promise.all([
    db.runSql(createSharePurchaseDocuments),
    db.runSql(createSubmittedSharePurchaseDocuments),
    db.runSql(insertParam),
  ])
};

exports.down = function(db) {
  return Promise.all([
    db.runSql(deleteSharePurchaseDocuments),
    db.runSql(deleteSubmittedSharePurchaseDocuments),
    db.runSql(deleteParam),
  ])
};

exports._meta = {
  "version": 1
};
