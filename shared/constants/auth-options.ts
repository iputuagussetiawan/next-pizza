import NextAuth, { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole,
                }
            }
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'E-Mail', type: 'text', placeholder: 'jhon@gmail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;
        
                const values = {
                    email: credentials.email,
                };
        
                const findUser = await prisma.user.findFirst({
                    where: values,
                });
        
                if (!findUser) return null;
        
                const isPasswordValid = await compare(credentials.password, findUser.password);
        
                if (!isPasswordValid) return null;
        
                if (!findUser.verified) return null;
        
                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role,
                };
            },
        }),
      // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === 'credentials') {
                    return true;
                }
        
                console.log(user, account);
        
                if (!user.email) {
                    return false;
                }
        
                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email },
                        ],
                    },
                });
        
                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });
                    return true;
                }
        
                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || 'User #' + user.id,
                        password: hashSync(user.id.toString(), 10),
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    },
                });
        
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async jwt({ token }) {
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email!,
                },
            });
            if (findUser) {
                token.id = String(findUser.id);
                token.email = findUser.email;
                token.fullName = findUser.fullName;
                token.role = findUser.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
}
