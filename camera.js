document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snapButton = document.getElementById('snap');
    const context = canvas.getContext('2d');

    // カメラを起動
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.log("カメラの起動に失敗しました: " + err);
        });

    // 写真を撮る処理
    snapButton.addEventListener('click', function() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');

        // ローカルストレージに写真データを保存
        localStorage.setItem('photoData', dataURL);
        localStorage.setItem('photoTaken', 'true');

        // フォームを作成して写真データを送信
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/photo';
        document.body.appendChild(form);
        form.submit();
    });
});