// app/services/auth.server.ts
import { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { db } from "~/db.server";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL || "",
  },
  async ({ profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    let user = await db.user.findUnique({
      where: { email: profile.emails[0].value },
    });

    if (!user) {
      user = await db.user.create({ data: { email: profile.emails[0].value } });
    }

    return user;
  }
);

authenticator.use(googleStrategy, "google");
