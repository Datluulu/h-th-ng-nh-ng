const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000; // Chọn cổng mà server sẽ lắng nghe

const uri = "mongodb+srv://abc:dat1211dat@cluster0.fqavjt8.mongodb.net/adxl345?retryWrites=true&w=majority&appName=Cluster0";
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
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  

// Gửi dữ liệu POST lên MongoDB Atlas
app.post('/api/data', async (req, res) => {
  try {
    const { x, y, z } = req.body;

    // Chọn cơ sở dữ liệu và collection
    const database = client.db('nhung');
    const collection = database.collection('adxl345');

    // Tạo một document mới để lưu vào collection
    const result = await collection.insertOne({ x, y, z });

    console.log('Data inserted:', result.insertedId);
    res.status(201).json({ message: 'Data saved successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Khởi động server và kết nối tới MongoDB Atlas trước khi lắng nghe yêu cầu
async function startServer() {
    run().catch(console.dir);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Gọi hàm startServer để bắt đầu server và kết nối tới MongoDB Atlas
startServer();
