import { getSession } from "next-auth/react";
import { editProfileSchema } from "./../../../validation/schema/auth";
import { getFormattedError, isEmptyObject } from "./../../../validation/helper";
import { connectToDatabase } from "./../../../back_end/database";
import {
  isPasswordMatch,
  getHashedPassword,
} from "./../../../back_end/helper/auth";

async function handler(req, res) {
  // if method is not equal to PATCH
  if (req.method !== "PATCH") {
    return;
  }

  // get request body
  const body = req.body;

  // validate form data in backend
  const { error } = editProfileSchema.validate(body, { abortEarly: false });

  // if form data has error
  if (!isEmptyObject(error)) {
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: "form validation error",
      errorType: "ValidationError",
      error: getFormattedError(error),
    });
  }

  // get user session
  const session = await getSession({ req: req });

  // if session is not set
  if (!session) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Not authorized.",
      errorType: "UnauthorizedError",
    });
  }

  // get connecttion
  const client = await connectToDatabase();

  // get database instance
  const db = client.db();

  // check user exists in database
  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  // if user not exists
  if (!user) {
    // close database connection
    client.close();

    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: "User not exists.",
      errorType: "ValidationError",
      error: {
        oldPassword: "User not exists.",
      },
    });
  }

  // match provided old password in database value
  if (!isPasswordMatch(body.oldPassword, user.password)) {
    // close database connection
    client.close();

    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: "form validation error",
      errorType: "ValidationError",
      error: {
        oldPassword: "Old Password dont match in database.",
      },
    });
  }

  try {
    // update user password
    await db
      .collection("users")
      .findOneAndUpdate(
        { email: session.user.email },
        { $set: { password: getHashedPassword(body.password) } }
      );

    // close database connection
    client.close();

    // success response
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User password is changed.",
    });
  } catch (error) {
    // close database connection
    client.close();

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Fail to update user password.",
      errorType: "DatabaseError",
    });
  }
}

export default handler;
