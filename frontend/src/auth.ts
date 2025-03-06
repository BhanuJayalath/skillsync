import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/database/route";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { PassThrough } from "stream";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "profile email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "google") {
        await connectDB();

        let existingUser = await User.findOne({ email: user.email });
        console.log(user);
        if (!existingUser) {
          existingUser = new User({
            email: user.email,
            username: profile.given_name,
            password:'$SOCIAL_LOGIN',
            provider: "google",
          });
          await existingUser.save();
        }

        return true;
      }
      return true;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.image = token.picture;

      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.name = sessionUser?.firstName + " " + sessionUser?.lastName;

      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;
        token.email = user.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
      },
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
