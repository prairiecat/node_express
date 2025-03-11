document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snapButton = document.getElementById('snap');
    const cameraSelect = document.getElementById('cameraSelect');
    const context = canvas.getContext('2d');

    function startCamera(facingMode) {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { exact: facingMode },
                width: { ideal: 640 },
                height: { ideal: 360 }
            }
        })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.log("カメラの起動に失敗しました: " + err);
        });
    }

    // 初期カメラ起動（アウトカメラ）
    startCamera('environment');

    // インカメラを使用するボタンの処理
    useFrontCameraButton.addEventListener('click', function() {
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
        startCamera('user');
    });

    // アウトカメラを使用するボタンの処理
    useBackCameraButton.addEventListener('click', function() {
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
        startCamera('environment');
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
        form.action = '/save-photo';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'photo';
        input.value = dataURL;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    });
});