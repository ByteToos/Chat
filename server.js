const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Указываем порт (ваш код)
const PORT = process.env.PORT || 5000;

// Настройка статических файлов
app.use(express.static(path.join(__dirname, "public")));

// Роут для главной страницы
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Обработчики Socket.io
io.on("connection", (socket) => {
    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", `${username} присоединился к чату`);
    });
    socket.on("exituser", (username) => {
        socket.broadcast.emit("update", `${username} покинул чат`);
    });
    socket.on("chat", (message) => {
        socket.broadcast.emit("chat", message);
    });
});

// Запуск сервера (ваш код)
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});