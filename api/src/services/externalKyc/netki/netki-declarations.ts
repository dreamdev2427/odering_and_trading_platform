export interface NetkiParamJson {
  mobileAppPanel: string;
  username: string;
  password: string;
  sendEmail: boolean;
  emailHeader: string;
  emailBody: string;
  attachMobileAppPanelToEmail: boolean;
}

export interface NetkiWebhookPayload {
  id: string;
  client: string;
  state: string;
  transaction_identity: {
    id: string;
    identity_emails: [
      {
        id: string;
        created: string;
        updated: string;
        is_active: boolean;
        email: string;
        identity: string;
      },
    ];
    identity_phone_numbers: [
      {
        id: string;
        created: string;
        updated: string;
        is_active: boolean;
        phone_number: string;
        identity: string;
      },
    ];
    identity_addresses: [
      {
        id: string;
        created: string;
        updated: string;
        is_active: boolean;
        address: string;
        unit: string;
        city: string;
        state: string;
        postalcode: string;
        score: string;
        country_code: string;
        identity: string;
      },
    ];
    identity_documents: [
      {
        id: string;
        errors: [];
        mime_type: string;
        created: string;
        updated: string;
        document: string;
        document_type: string;
        expiration_date: string;
        state: string;
        is_active: boolean;
        identity: string;
        document_classification: string;
        contenttype: string;
      },
    ];
    identity_access_code: {
      id: string;
      code: string;
      identity: string;
      parent_code: string;
      child_codes: [];
      is_active: boolean;
      business: string;
      created: string;
      updated: string;
    };
    identity_json_objects: [];
    errors: [];
    created: string;
    updated: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    alias: string;
    country_code: string;
    selected_country_code: string;
    locale: string;
    state: string;
    is_active: string;
    death_date: string;
    birth_location: string;
    status: string;
    client_guid: string;
    birth_date: string;
    gender: string;
    height: string;
    weight: string;
    eye_color: string;
    hair_color: string;
    investor_type: string;
    ssn: string;
    drivers_license: string;
    passport_number: string;
    is_accredited_investor: boolean;
    title: string;
    ownership_percentage: string;
    notes: string;
    phone_is_validated: boolean;
    transaction: string;
    business: string;
  };
}

export interface AuthorizationResponse {
  refresh: string;
  access: string;
}

export interface BusinessMetadata {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: string;
      is_active: boolean;
      name: string;
    },
  ];
}

export interface AccessCodesResponse {
  count: number;
  results: [
    {
      id: string;
      code: string;
      identity: string;
      parent_code: {
        code: string;
        is_active: boolean;
      };
      child_codes: [
        {
          code: string;
          is_active: boolean;
        },
      ];
      is_active: boolean;
      business: string;
      created: string;
      updated: string;
    },
  ];
}

export interface TransactionDetails {
  count: number;
  results: [
    {
      transaction_identity: {
        identity_emails: [
          {
            created: string;
            updated: string;
            is_active: boolean;
            email: string;
          },
        ];
        identity_phone_numbers: [
          {
            created: string;
            updated: string;
            is_active: boolean;
            phone_number: string;
          },
        ];
        identity_addresses: [
          {
            created: string;
            updated: string;
            is_active: boolean;
            address: string;
            unit: string;
            city: string;
            state: string;
            postalcode: string;
            country_code: string;
          },
        ];
        identity_documents: [];
        identity_data_listings: [];
        identity_media_references: [];
        identity_accredited_investor_status: null;
        identity_json_objects: [];
        errors: [];
        created: string;
        updated: string;
        is_active: boolean;
        first_name: string;
        last_name: string;
        middle_name: string;
        alias: string;
        country_code: string;
        selected_country_code: string;
        locale: string;
        state: string;
        death_date: string;
        birth_location: string;
        status: string;
        client_guid: string;
        birth_date: string;
        gender: string;
        height: string;
        weight: string;
        eye_color: string;
        hair_color: string;
        investor_type: string;
        ssn: string;
        medical_license: string;
        insurance_license: string;
        drivers_license: string;
        passport_number: string;
        is_accredited_investor: string;
        title: string;
        ownership_percentage: string;
        notes: string;
        source_of_wealth: string;
        tax_id: string;
        phone_is_validated: boolean;
      };
      created: string;
      updated: string;
      is_active: boolean;
      state: string;
    },
  ];
}
