
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL)

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: true,
	adapter: PrismaAdapter(prisma),
	providers: [Google],
	callbacks: {
		async session({ session, user }) {
			if (session.user) {
				session.user.id = user.id
			}
			return session
		}
	}
})
