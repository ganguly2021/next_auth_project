import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../back_end/database";
import { loginSchema } from "../../../validation/schema/auth";
import { isEmptyObject, getFormattedError } from "../../../validation/helper";
import { isPasswordMatch } from "../../../back_end/helper/auth";

// next auth configuration
export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.secret,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // get form data
        const body = {
          email: credentials.email,
          password: credentials.password,
        };

        // check form validation
        const { error } = loginSchema.validate(body, { abortEarly: true });

        // if form validation error
        if (!isEmptyObject(error)) {
          const temp = {
            success: false,
            statusCode: 422,
            message: "form validation error",
            errorType: "ValidationError",
            error: getFormattedError(error),
          };

          throw new Error(JSON.stringify(temp));
        }

        // get database connection
        const client = await connectToDatabase();

        // get database instance
        const db = client.db();

        const user = await db
          .collection("users")
          .findOne({ email: body.email });

        // if user dont exists
        if (!user) {
          // close database connection
          client.close();

          const temp = {
            success: false,
            statusCode: 422,
            message: "form validation error",
            errorType: "ValidationError",
            error: {
              email: "User don't exists.",
            },
          };

          throw new Error(JSON.stringify(temp));
        }

        // if password don't match
        if (!isPasswordMatch(body.password, user.password)) {
          // close database connection
          client.close();

          const temp = {
            success: false,
            statusCode: 422,
            message: "form validation error",
            errorType: "ValidationError",
            error: {
              password: "Password dont match in database.",
            },
          };

          throw new Error(JSON.stringify(temp));
        }

        // close database connection
        client.close();

        // if everything is success
        return {
          email: user.email,
          username: user.username,
          isActive: user.isActive,
        };
      },
    }),
  ],
});
