// 初始化 Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC5hND33E65gFQE8g8r48r1yCSbtliuWHw",
    authDomain: "twomistudio-board.firebaseapp.com",
    databaseURL: "https://twomistudio-board-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "twomistudio-board",
    storageBucket: "twomistudio-board.firebasestorage.app",
    messagingSenderId: "83895449141",
    appId: "1:83895449141:web:7a735450f8bdf985dfe37c"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const commentsRef = database.ref('comments');

// 提交留言
document.getElementById('comment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    // 驗證輸入
    if (!name || !message) {
        alert('請填寫姓名和留言！');
        return;
    }

    const timestamp = new Date().toISOString();

    // 儲存留言到 Firebase
    commentsRef.push({
        name: name,
        message: message,
        timestamp: timestamp
    }).catch((error) => {
        console.error('留言儲存失敗:', error);
        alert('留言儲存失敗，請稍後再試！');
    });

    // 清空表單
    document.getElementById('comment-form').reset();
});

// 即時顯示留言
commentsRef.on('child_added', (snapshot) => {
    const comment = snapshot.val();
    const commentsDiv = document.getElementById('comments');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';

    // 格式化時間戳記
    const formattedTimestamp = new Date(comment.timestamp).toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // 防止 XSS 攻擊
    commentElement.innerHTML = `<strong>${escapeHTML(comment.name)}</strong> (${formattedTimestamp}): <p>${escapeHTML(comment.message)}</p>`;
    commentsDiv.appendChild(commentElement);
});

// 防止 XSS 的函數
function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}