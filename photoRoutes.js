const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post("/photo", function(req, res) {
    res.sendFile(path.join(__dirname, 'photo.html'));
});

router.post("/save-photo", function(req, res) {
    const photoData = req.body.photo;
    const base64Data = photoData.replace(/^data:image\/png;base64,/, "");
    const fileName = `${Date.now()}.png`;
    const filePath = path.join(__dirname, 'photos', fileName);

    fs.writeFile(filePath, base64Data, 'base64', function(err) {
        if (err) {
            console.log(err);
            res.status(500).send("写真の保存に失敗しました");
        } else {
            res.sendFile(path.join(__dirname, 'photosended.html'));
        }
    });
});

// 写真を表示するエンドポイント
router.get("/photos/:fileName", function(req, res) {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'photos', fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send("写真が見つかりません");
        } else {
            res.sendFile(filePath);
        }
    });
});

// 写真の一覧を表示するエンドポイント
router.get("/photos", function(req, res) {
    const photosDir = path.join(__dirname, 'photos');
    fs.readdir(photosDir, (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send("写真の一覧を取得できませんでした");
        } else {
            const photoList = files.map(file => `<li><a href="/photos/${file}">${file}</a></li>`).join('');
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>保存された写真</title>
                </head>
                <body>
                    <h1>保存された写真</h1>
                    <ul>${photoList}</ul>
                    <a href="/">ホームに戻る</a>
                </body>
                </html>
            `);
        }
    });
});

module.exports = router;