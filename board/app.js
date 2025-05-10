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
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toISOString();
  
    // 儲存留言到 Firebase
    commentsRef.push({
      name: name,
      message: message,
      timestamp: timestamp
    });
  
    // 清空表單
    document.getElementById('comment-form').reset();
  });
  
  // 即時顯示留言
  commentsRef.on('value', (snapshot) => {
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';
    const comments = snapshot.val();
    if (comments) {
      Object.values(comments).forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `<strong>${comment.name}</strong> (${comment.timestamp}): <p>${comment.message}</p>`;
        commentsDiv.appendChild(commentElement);
      });
    }
  });