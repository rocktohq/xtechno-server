const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Server Root Route
app.get("/", (req, res) => {
  res.send("xTechno Server is Running...");
});

// MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@usermanagement.n4peacj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Collections
    const productCollection = client.db("xTechno").collection("products");
    const userCollection = client.db("xTechno").collection("users");
    const brandCollection = client.db("xTechno").collection("brands");
    const myCart = client.db("xTechno").collection("cart");
    const adCollection = client.db("xTechno").collection("advertisements");

    // Get Brands
    app.get("/brands", async (req, res) => {
      const brands = brandCollection.find();
      const result = await brands.toArray();
      res.send(result);
    });

    // Get Brands Advertisements
    app.get("/advertisements/:brandId", async (req, res) => {
      const brandId = req.params.brandId;
      const query = { _id: new ObjectId(brandId) };
      const advertisements = advertisements.find(query);
      const result = await advertisements.toArray();
      res.send(result);
    });

    // Get All Products of a Brand
    app.get("/brands/:brand", async (req, res) => {
      const brand = req.params.brand;
      const query = { brand: brand };
      const products = productCollection.find(query);
      const result = await products.toArray();
      res.send(result);
    });

    // Get Single Product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Server Listener
app.listen(port, () => {
  console.log("Server is running on port:", port);
})