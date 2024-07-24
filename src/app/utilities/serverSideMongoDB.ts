const { MongoClient } = require("mongodb");

const uri = process.env.NEXT_PUBLIC_URI as string

async function connectToDatabase() {
  if (!uri) {
    throw new Error("MongoDB URI is not defined");
  }
  const client = await MongoClient.connect(uri);
  try {    
    await client.connect()
    await client.db("Test").command({ping: 1});    
    console.log("pinged successfully")
  } finally {
    await client.close();
  }
}

connectToDatabase().catch(console.dir)