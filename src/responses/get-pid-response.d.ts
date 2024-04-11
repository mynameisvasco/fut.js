export interface GetPidResponse {
    pid: {
        externalRefType: string;
        externalRefValue: string;
        pidId: number;
        email: string;
        emailStatus: string;
        strength: string;
        dob: string;
        country: string;
        language: string;
        locale: string;
        status: string;
        reasonCode: string;
        tosVersion: string;
        parentalEmail: string;
        thirdPartyOptin: string;
        globalOptin: string;
        dateCreated: string;
        dateModified: string;
        lastAuthDate: string;
        registrationSource: string;
        authenticationSource: string;
        showEmail: string;
        discoverableEmail: string;
        anonymousPid: string;
        underagePid: string;
        defaultBillingAddressUri: string;
        defaultShippingAddressUri: string;
        passwordSignature: number;
    };
}
