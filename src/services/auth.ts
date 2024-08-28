import NextAuth from "next-auth";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: DrizzleAdapter(db),
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID!,
         clientSecret: process.env.GITHUB_SECRET!,
      }),
   ],
   callbacks: {
      session: ({ session, user }) => ({
         ...session,
         user: {
            ...session.user,
            id: user.id,
         },
      }),
   },
});
