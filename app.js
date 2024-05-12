const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Chuỗi kết nối tới MongoDB
const uri = "mongodb+srv://abc:123@cluster0.n3lv50h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Khởi tạo MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Kết nối tới MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo(); // Gọi hàm kết nối MongoDB khi server khởi động

// Middleware để xử lý dữ liệu JSON từ request body
app.use(express.json());

// API endpoint để nhận dữ liệu từ ESP8266 và lưu vào MongoDB
app.post('/api/data', async (req, res) => {
  try {
    const { x, y, z } = req.body;

    // Lấy tham chiếu tới database và collection
    const db = client.db("nhung");
    const collection = db.collection("adxl3456");

    // Tạo document để lưu vào collection
    const result = await collection.insertOne({ x, y, z, timestamp: new Date() });

   // console.log("Data saved to MongoDB:", result.ops[0]);

    res.status(201).json({ message: 'Data saved successfully'});
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ message: "Error saving data" });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
