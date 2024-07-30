const express = require("express");
const compression = require("compression");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(compression());
app.use(
  "/videos",
  express.static(path.join(__dirname, "public/videos"), {
    maxAge: "1d",
    immutable: false,
  })
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "public/assets"), {
    maxAge: "1d",
    immutable: false,
  })
);

app.use("/dict/initialize/launch/button.html", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public/dict/initialize/launch/button.html")
  );
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "video.html"));
});

app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "video.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("playVideo", () => {
    io.emit("playVideo");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3333;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
