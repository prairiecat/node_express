const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post("/photo", function(req, res) {
    res.sendFile(path.join(__dirname, 'photo.html'));
});

router.post("/save-photo", function(req, res) {
    const photoData = req.body.photo;
    // 写真データを保存する処理を追加
    const base64Data = photoData.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("saved_photo.png", base64Data, 'base64', function(err) {
        if (err) {
            console.log(err);
            res.status(500).send("写真の保存に失敗しました");
        } else {
            // 写真が保存された後の処理を追加
            res.sendFile(path.join(__dirname, 'photosended.html'));
        }
    });
});

module.exports = router;