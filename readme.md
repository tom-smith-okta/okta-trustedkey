# Okta + TrustedKey integration

You can connect TrustedKey as a source of identities to your Okta tenant. This integration happens via OIDC, where TrustedKey is the IDP and Okta is the RP.

## Setup

Note: this integration depends on Okta's support for arbitrary OIDC providers. This capability is currently (Nov. 2018) in beta.

Setting up TrustedKey as an OIDC provider is straightforward.

First, follow [TrustedKey's instructions](https://trustedkey.github.io/RelyingParty-Tutorial/) for setting up a relying party.

When you set up your TrustedKey app, add your Okta tenant as a `callback URL`. For example: `https://mytenant.okta.com`

Follow the instructions to set up an arbitrary external OIDC provider. Use the client id and secret from your TrustedKey app as the client_id and client_secret in your OIDC IDP.

Choose whatever scopes you want to ask for from the TrustedKey user profile. Typically, these scopes are something like: `openid profile email`

If you are asking for scopes beyond `openid`, then you will need to set up another IDP for TrustedKey in your Okta tenant, so that the end-user is not prompted to consent to scopes every time they authenticate.

Just set up another IDP representing TrustedKey the same way you did the first one (same TrustedKey client_id and client_secret), but for `scope` field add only `openid`.

The first TrustedKey IDP will be your "registration" IDP - use this IDP ID when you want a TrustedKey user to create an account. The second TrustedKey IDP will be your "authentication" IDP, to be used when a user wants to authenticate.

## Sample app

You can use the sample app in this repo to test your TrustedKey + Okta integration. This is a nodejs app, so clone the repo and then run

`npm install`

Copy the .env_example file to a file called .env and add your own values. Then, you can run 

`node app.js`

to test registration and authentication to Okta using TrustedKey.
