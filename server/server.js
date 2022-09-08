import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//import database connection
import connectDB from "./db/Connection.js";

//import middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//import router
import vehicleRouter from "./routes/vehicleRoutes.js";

//test home route
app.get("/", (req, res) => {
  res.json("welcome");
});

//routers
app.use("/api/v1/vehicle", vehicleRouter);

// middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

//create server port
const port = process.env.PORT || 5000;

//connect db and start server listen
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server Is Listening Port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
