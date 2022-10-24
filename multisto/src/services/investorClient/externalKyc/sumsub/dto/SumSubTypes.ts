export type SumSubRequestConfig = {
    appToken: string,
    signature: string,
    secondsSinceEpoch: number
}

export type SumSubKycDataResponse = {
    "id": string,
    "createdAt": string,
    "clientId": string,
    "inspectionId": string,
    "externalUserId": string,
    "fixedInfo": {
        "firstName": string,
        "lastName": string,
        "country": string,
        "addresses": [{
            "flatNumber":string,
            "street":string,
            "buildingNumber":string,
            "town":string,
            "postCode":string,
            "country":string
        }]
    },
    "info": {
        "firstName": string,
        "lastName": string,
        middleName: string,
        "dob": string,
        "country": string,
        "addresses": [{
            "flatNumber":string,
            "street":string,
            "buildingNumber":string,
            "town":string,
            "postCode":string,
            "country":string
        }],
        city: string,
        postalCode: string,
        state: string,
        "phone": string,
        nationality: string,
        "idDocs": [
            {
                "idDocType": string,
                "country": string,
                "firstName": string,
                "firstNameEn": string,
                "lastName": string,
                "lastNameEn": string,
                "validUntil": string,
                "number": string,
                "dob": string,
                "mrzLine1": string,
                "mrzLine2": string,
                "mrzLine3": string
            }
        ]
    },
    "email": string,
    "applicantPlatform": string,
    "requiredIdDocs": {
        "docSets": [
            {
                "idDocSetType": string,
                "types": [
                    string,
                    string
                ]
            },
            {
                "idDocSetType": string,
                "types": [
                    string
                ]
            }
        ]
    },
    "review": {
        "elapsedSincePendingMs": number,
        "elapsedSinceQueuedMs": number,
        "reprocessing": boolean,
        "levelName": string,
        "createDate": string,
        "reviewDate": string,
        "startDate": string,
        "reviewResult": {
            "reviewAnswer": string,
            "reviewRejectType": string
        },
        "reviewStatus": string
    },
    "lang": string,
    "type": string,
    "metadata":[
        {
            "key":string,
            "value":string
        }
    ]
}

export type SumSubWebhookPayload = {
    applicantId: string,
    inspectionId: string,
    correlationId: string,
    externalUserId: string,
    type: string,
    reviewStatus: string,
    createdAt: string,
    applicantType: string,
    reviewResult: {
        reviewAnswer: string,
        reviewRejectType: string,
        rejectLabels: [string]
    },
    applicantMemberOf: [{}],
    videoIdentReviewStatus: string,
    applicantActionId: string,
    externalApplicantActionId: string,
    clientId: string,
}