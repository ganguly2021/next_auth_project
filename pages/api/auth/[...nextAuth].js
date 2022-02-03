import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "./../../../back_end/database";
import { loginSchema } from "./../../../validation/schema/auth";
import { isEmptyObject, getFormattedError } from "./../../../validation/helper";
import { isPasswordMatch } from "./../../../back_end/helper/auth";

// next auth configuration
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(body) {
        // check form validation
        const { error } = loginSchema.validate(body, { abortEarly: false });

        // if form validation error
        if (!isEmptyObject(error)) {
          return res.status(422).json({
            success: false,
            statusCode: 422,
            message: "form validation error",
            errorType: "ValidationError",
            error: getFormattedError(error),
          });
        }

        // get database connection
        const client = await connectToDatabase();

        // get database instance
        const db = client.db();

        const user = db.collection("users").findOne({ email: body.email });

        // if user dont exists
        if (!user) {
          // close database connection
          client.close();

          throw new Error({
            success: false,
            statusCode: 422,
            message: "form validation error",
            errorType: "ValidationError",
            error: {
              email: "User don't exists.",
            },
          });
        }

        // if password don't match
        if (!isPasswordMatch(body.password, user.password)) {
          // close database connection
          client.close();

          throw new Error({
            success: false,
            statusCode: 422,
            message: "form validation error",
            errorType: "ValidationError",
            error: {
              password: "Password dont match in database.",
            },
          });
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
