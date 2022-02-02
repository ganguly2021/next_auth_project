import { connectToDatabase } from "./../../../back_end/database";

async function handler(req, res) {
  // signup new user
  if (req.method === "POST") {
    // get request body
    const body = req.body;

    // get connecttion
    const client = await connectToDatabase();

    // get database instance
    const db = client.db();

    // create users collections
    db.createCollection("users");
  }
  
  return res
    .status(200)
    .json({ name: "Signup Route.", message: process.env.secret });
}

export default handler;
