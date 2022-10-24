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
    }
  ];
}

export interface AccessCodesResponse {
  count: number;
  results: [
    {
      id: string;
      code: string;
      identity: string;
      parent_code: string;
      child_codes: [
        {
          code: string;
          is_active: boolean;
        }
      ];
      is_active: boolean;
      business: string;
      created: string;
      updated: string;
    }
  ];
}
