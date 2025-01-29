const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./Models/db');
const EmployeeRouter = require('./Routes/EmployeeRoutes');
const mongoose = require("mongoose");
const multer = require('multer');
const pdfGenerator = require('./Controllers/pdfGenerator');

app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use("/files", express.static("files"));
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection
const mongoUrl = "mongodb+srv://itmediausda:Urban1992@cluster0.k7bbc.mongodb.net/";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage }); // Define upload middleware here

// Route for file upload
app.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
      await PdfSchema.create({ title: title, pdf: fileName });
      res.send({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
});

app.get("/get-files", async (req, res) => {
    try {
      PdfSchema.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
});

// Routes
app.post('/generate-letter', pdfGenerator.generateLetter);

// API Endpoints
app.get("/", async (req, res) => {
    res.send("Success!");
});

app.get('/', (req, res) => {
    res.send('Employee Mgm server is running');
});

// Use Routes
app.use('/api/employees', EmployeeRouter);
app.use('/api/leaves', EmployeeRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
