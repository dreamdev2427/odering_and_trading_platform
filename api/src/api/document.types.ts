import { Field, Float, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class DocumentField {
  @Field()
  ID: string;

  @Field(() => Int)
  documentID: number;

  @Field()
  title: string;

  @Field(() => Int)
  type: number;

  @Field()
  helperText: string;
}

@ObjectType()
export class Document {
  @Field(() => Int)
  ID: number;

  @Field()
  title: string;

  @Field()
  contents: string;

  @Field(() => Int, { nullable: true })
  directoryID: number;

  @Field(() => Int)
  filetype: number;
}

@ObjectType()
export class DocumentCommentReply {
  @Field(() => Int)
  investorID: number;

  @Field()
  text: string;

  @Field()
  modified: Date;
}

@ObjectType()
export class DocumentComment {
  @Field(() => Int)
  ID: number;

  @Field(() => Int)
  documentID: number;

  @Field(() => Int)
  investorID: number;

  @Field()
  text: string;

  @Field()
  modified: Date;

  @Field({ nullable: true })
  reply: DocumentCommentReply;
}

export class DocumentDirectory {
  @Field(() => Int)
  ID: number;

  @Field(() => Float, { nullable: true })
  parentID: number;

  @Field()
  title: string;
}

@ObjectType()
export class DocumentFieldValue {
  @Field()
  ID: string;

  @Field()
  value: string;
}

@ObjectType()
export class DocumentSignature {
  @Field()
  url: string;

  @Field()
  modified: Date;
}

@ObjectType()
export class SubmittedDocument {
  @Field(() => Int)
  investorID: number;

  @Field(() => Int)
  ID: Int;

  @Field()
  contents: string;

  @Field(() => Int)
  documentID: number;

  @Field(() => Int)
  status: number;

  @Field(() => [DocumentFieldValue])
  fieldValues: DocumentFieldValue[];

  @Field({ nullable: true })
  signature: DocumentSignature;

  @Field()
  document: Document;
}

@ObjectType()
export class OfferedDocument {
  @Field(() => Int)
  ID: Int;

  @Field()
  document: Document;

  @Field()
  from: Date;

  @Field()
  to: Date;

  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class SharePurchaseDocument {
  @Field()
  document: Document;

  @Field()
  requireOnce: boolean;

  @Field(() => Int, { nullable: true })
  status: number;
}

@ObjectType()
export class HelloSignWebhookPayload {
  @Field()
  "account_guid": string;

  @Field()
  "client_id": string;

  @Field()
  "signature_request": {
    "signature_request_id": string,
    "test_mode": boolean,
    "title": string,
    "original_title": string,
    "subject": string,
    "message": string,
    "metadata": {
      "signed_on_domain": string
    };
    "response_data": [
      {
        "name": string;
        "type": string;
        "required": boolean;
        "api_id": string;
        "value": string;
        "signature_id": string;
      }
    ];
    "custom_fields": [
      {
        "name": string;
        "type": string;
        "required": string;
        "api_id": string;
        "editor": string;
        "value": string;
      }
    ];
    "signatures": [
      {
        "signature_id": string;
        "has_pin": boolean;
        "has_sms_auth": boolean;
        "signer_email_address": string;
        "signer_name": string;
        "signer_role": string;
        "order": string;
        "status_code": string;
        "signed_at": number;
        "last_viewed_at": number;
        "last_reminded_at": string;
        "error": string;
      }
    ];
    "created_at": number;
    "is_complete": boolean;
    "is_declined": boolean;
    "has_error": boolean;
    "signing_url": string;
    "signing_redirect_url": string;
    "final_copy_uri": string;
    "files_url": string;
    "details_url": string;
    "requester_email_address": string;
    "cc_email_addresses": [];
    "template_ids": [string];
  };

  @Field()
  event: {
    event_time: string;
    event_type: string;
    event_hash: string;
    event_metadata: {
      related_signature_id: string;
      reported_for_account_id: string;
      reported_for_app_id: string;
    }
  };
}

