# This file will be used to describe deprecated application's part,  which has to be removed in future



## SSO settings

In multisto aws cognito used for SSO. Now we provide SSO through API role with `SSOSignIn` mutation.

### Params have to be removed

- SSORedirectFrontEnd: the api does not redirect users
- CognitoUserPoolId 
- CognitoClientId
- CognitoPool_region
