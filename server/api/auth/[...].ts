import { NuxtAuthHandler } from '#auth'
import Auth0Provider from 'next-auth/providers/auth0'

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        Auth0Provider.default({
            clientId: process.env.AUTH_ZERO_CLIENT,
            clientSecret: process.env.AUTH_ZERO_SECRET,
            issuer: process.env.AUTH_ZERO_ISSUER,
            response_type: 'code',
            audience: 'https://been-coffee.eu.auth0.com/userinfo',
            scope: 'openid profile email offline_access user token id_token access_token'
        })
    ],
    callbacks: {
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async ({token, user}) => {
          const isSignIn = user ? true : false;
          if (isSignIn) {
            token.jwt = user ? (user as any).access_token || '' : '';
            token.id = user ? user.id || '' : '';
            token.role = user ? (user as any).role || '' : '';
            token.name = user ? (user as any).name || '' : '';
            token.updated_at = user ? (user as any).updated_at || '' : '';
            token.created_at = user ? (user as any).created_at || '' : '';
          }
          return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({session, token}) => {
          (session as any).role = token.role;
          (session as any).uid = token.id;
          (session as any).name = token.name;
          (session as any).updated_at = token.updated_at;
          (session as any).user_metadata = token.user_metadata;
          (session as any).metadata = token.metadata;
          (session as any).created_at = token.created_at;
          return Promise.resolve(session);
        },
      },
})
