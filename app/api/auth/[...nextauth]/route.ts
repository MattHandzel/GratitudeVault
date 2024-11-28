import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import {v4 as uuidv4} from "uuid"
import { UserSettings } from "@/lib/types"
import crypto from "crypto"
import { ThemeProvider } from "@/components/theme-provider"

const handler = NextAuth({
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
    signIn: '/auth/signin',
  },

callbacks: {
    async signIn({ user  }) {
      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const usersCollection = db.collection("users");

      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email: user.email });
      if (!existingUser) {
        const userId = crypto.createHash('sha256').update(user.email).digest('hex');
        const publicUrl = crypto.createHash('sha256').update(userId).digest('hex');
        await usersCollection.insertOne({
          id: userId,
          name: user.name,
          email: user.email,
          createdAt: new Date(),
          gratitudes: [],
          publicUrl: publicUrl,
          settings: {
            theme: "system",
            soundEnabled : true,
            remindersEnabled : true,
          },


        });
      }

      return true; // Allow sign-in
    },
    async session({ session, token }) {
      console.log("sessiosn", session)
      console.log("ttoken", token)
      session.user.id = crypto.createHash('sha256').update(session.user.email).digest('hex'); // Add user ID to session
      return session;
    },
    async jwt({ token, user }) {
      console.log("tuser", user)
      if (user) {
        token.sub = user.id; // Attach MongoDB user ID to the token
      }
      return token;
    },
  },

})

export { handler as GET, handler as POST }

