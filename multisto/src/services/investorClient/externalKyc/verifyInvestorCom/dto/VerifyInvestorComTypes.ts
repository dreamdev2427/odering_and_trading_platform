export type VeifyInvestorComWebhookPayload = {
    "action": string,
    "verification_request_id": number,
    "investor_id": number,
    "legal_name": string,
    "verification_status": string,
    "verification_result_status": string,
    "verification_request_step": string,
    "status": string,
    "eapi_identifier": string,
    "embedded_api": boolean
}

export type VerifyInvestorComKycDataResponse = {
    "id": number,
    "created_at": string,
    "completed_at": string,
    "portal_name": string,
    "verified_expires_at": string,
    "deal_name": string,
    "verification_request_step": string,
    "api_type": string,
    "identifier": string,
    "investor": {
        "id": number,
        "first_name": string,
        "last_name": string
    },
    "status": string,
    "legal_name": string
}

export type VerifyInvestorAppliedInvestors = {
    "id": number,
    "waiting_for_info": boolean,
    "portal_name": string,
    "verified_expires_at": string,
    "deal_name": string,
    "api_type": string,
    "identifier": string
}