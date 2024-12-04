import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";
import { UserSettings } from "@/lib/types";
import crypto from "crypto";
import { ThemeProvider } from "@/components/theme-provider";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      console.log("Sign in attempt :)");
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const usersCollection = db.collection(process.env.COLLECTION_NAME);

      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email: user.email });
      if (!existingUser) {
        const userId = crypto
          .createHash("sha256")
          .update(user.email)
          .digest("hex");

        const publicUrl = crypto
          .createHash("sha256")
          .update(userId)
          .digest("hex");

        await usersCollection.insertOne({
          id: userId,
          name: user.name,
          email: user.email,
          createdAt: new Date(),
          gratitudes: [],
          publicUrl: publicUrl,
          settings: {
            theme: "system",
            soundEnabled: true,
            remindersEnabled: true,
          },
        });
      }

      return true; // Allow sign-in
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect:", { url, baseUrl });
      return url.startsWith(baseUrl) ? url : baseUrl + url;
    },
    async session({ session, token }) {
      session.user.id = crypto
        .createHash("sha256")
        .update(session.user.email)
        .digest("hex");
      return session;
    },
    async jwt({ token, user }) {
      //console.log("tuser", user)
      if (user) {
        // dude
        token.sub = user.id; // Attach MongoDB user ID to the token
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
