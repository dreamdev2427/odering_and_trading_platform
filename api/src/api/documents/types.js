export default `
type DocumentField {
  """keyword, not databaseID"""
  ID: String!
  documentID: Int!
  title: String!
  type: Int!
  helperText: String!
}

type Document {
  ID: Int!
  title: String!
  contents: String!
  directoryID: Int
  filetype: Int!
}

type DocumentCommentReply {
  investorID: Int!
  text: String!
  modified: DateTime!
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type DocumentComment {
  ID: Int!
  documentID: Int!
  investorID: Int!
  text: String!
  modified: DateTime!
  reply: DocumentCommentReply
}

type DocumentDirectory {
  ID: Int!
  parentID: Float
  title: String!
}

type DocumentFieldValue {
  ID: String!
  value: String!
}

type DocumentSignature {
  url: String!
  modified: DateTime!
}

type SubmittedDocument {
  investorID: Int!
  ID:Int!
  contents:String!
  documentID: Int!
  status: Int!
  fieldValues: [DocumentFieldValue!]!
  signature: DocumentSignature
  document: Document!
}

type OfferedDocument {
  ID:Int!
  document: Document!
  from: DateTime!
  to: DateTime!
  title: String!
  description: String!
}

type SharePurchaseDocument {
  document: Document!
  requireOnce: Boolean!
  status: Int
}

input DocumentFieldValueDTO {
  ID: String!
  value: String!
}
`;
