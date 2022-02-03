import { connectToDatabase } from "./../../../back_end/database";
import { signupSchema } from "./../../../validation/schema/auth";
import { isEmptyObject, getFormattedError } from "./../../../validation/helper";
import { getHashedPassword } from "./../../../back_end/helper/auth";

async function handler(req, res) {
  // signup new user
  if (req.method === "POST") {
    // get request body
    const body = req.body;

    // validate form data in backend
    const { error } = signupSchema.validate(body, { abortEarly: false });

    // if form data has error
    if (!isEmptyObject(error)) {
      // close database connection
      db.close();

      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: "form validation error",
        errorType: "ValidationError",
        error: getFormattedError(error),
      });
    }

    // get connecttion
    const client = await connectToDatabase();

    // get database instance
    const db = client.db();

    // check email already exists in database or not
    const alreadyExists = await db
      .collection("users")
      .findOne({ email: body.email });

    if (alreadyExists) {
      // close database connection
      db.close();

      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: "User already exists.",
        errorType: "ValidationError",
        error: {
          email: "User email already exists.",
        },
      });
    }

    // create new user document
    const newUser = {
      email: body.email,
      username: body.username,
      password: getHashedPassword(body.password),
      isActive: true,
      createdAt: Date.now(),
    };

    // insert document in users collection
    const user = await db.collection("users").insertOne(newUser);

    if (user) {
      // close database connection
      db.close();

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User signup success.",
        user: user,
      });
    } else {
      // close database connection
      db.close();

      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Fail to create new user.",
        errorType: "DatabaseError",
      });
    }
  }

  return res
    .status(200)
    .json({ name: "Signup Route.", message: process.env.secret });
}

export default handler;
