const fs = require("fs")
const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true, limit: '10mb'}))

// 静的ファイルを提供するための設定を追加
app.use(express.static(__dirname))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get("/camera", function(req, res) {
    res.sendFile(__dirname + "/camera.html")
})

app.get("/friend", function(req, res) {
    res.sendFile(__dirname + "/friend.html")
})

app.post("/gage", function(req, res) {
    res.sendFile(__dirname + "/acumulated.html")
})

// app.get("/after", function(req, res){
//     res.sendFile(__dirname + "/afterHome.html")
// })

// 新しいルーティングファイルをインポートして使用
const photoRoutes = require('./photoRoutes');
app.use('/', photoRoutes);

const port = process.env.PORT || 5050

app.listen(port, function() {
    console.log(`Listening on localhost port ${port}`)
})