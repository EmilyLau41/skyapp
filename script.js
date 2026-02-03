// 這裡會從 Firebase 抓取所有資料
db.collection("dailySkies")
  .orderBy("timestamp", "desc") // 排序：最新在上，舊的在下
  .onSnapshot((snapshot) => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ""; // 每次更新先清空，再重新排列

    snapshot.forEach((doc) => {
      const data = doc.data();
      const dateStr = data.timestamp ? data.timestamp.toDate().toLocaleDateString('zh-TW') : '讀取中...';
      
      // 生成照片卡片
      const html = `
          <div class="sky-item">
              <img src="${data.imageUrl}" alt="Sky">
              <div class="sky-info">
                  <span class="date-tag">🗓️ ${dateStr}</span>
              </div>
          </div>
      `;
      gallery.innerHTML += html; // 逐一疊加顯示
    });
});