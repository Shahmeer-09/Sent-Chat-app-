require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const conectDb = require("./config/ConnectDb");
const morgan = require("morgan");
const { errormangerhandler } = require("./middlewares/Errormanger");
const authRouter = require("./routes/authRoutes");
const chatrouter = require("./routes/ChatRout");
const messageRouter = require("./routes/Message");
const EventEmitter = require("events");
const path = require("path");
const http = require("http");
const emitter = new EventEmitter();
emitter.setMaxListeners(20);
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const corsOptions = {
  origin: ["https://sent-chat-app.vercel.app/", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true,
};
console.log(path.resolve(__dirname, "./client/dist/index.html"))
app.use(cors(corsOptions));
app.use(express.static(path.resolve(__dirname, ".")));
app.use(express.json({ limit: "50mb" }));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); 
});
app.get('/favicon.png', (req, res) => {
  res.status(204).end(); 
});
app.use("/s1/auth", authRouter);
app.use("/s1/chat", chatrouter);
app.use("/s1/message", messageRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.use(errormangerhandler);






const server = http.createServer(app);
const io = require("socket.io")(server, {  
  pingTimeout: 60000,
  cors: {
    origin: "https://sent-chat-app.vercel.app/",
}}); 


io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    console.log(user)
    socket.join(user?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (chatid) => {  
    socket.join(chatid);
    console.log(`user joined room ${chatid}`);
  });
  socket.on("new message", (message) => {
    const chat = message?.chatid;

    if(!chat?.members) return console.log("chat.members not defined");
    chat?.members.forEach((user) => {
      // if (user._id == message.senderid) return;
      socket.in(user).emit("message recieved", message);
    });
    // socket.in(user._id).emit("message recieved", message);
  
  //  socket.in(chat._id).emit("message recieved", message);
  });

  socket.on("disconnect", () => {
    const user = socket.user;
    if (user) {
      socket.leave(user._id);   
    }
  });
});
(async () => {
  try {
    conectDb();
    server.listen(process.env.PORT && 8000, () => {
      console.log(`Server is running on port ${process.env.PORT && 8000}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();


module.exports = app;
