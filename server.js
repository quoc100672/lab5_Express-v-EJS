const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Thiết lập EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Đọc danh sách người nổi tiếng từ file JSON
const celebrities = JSON.parse(fs.readFileSync('celebrities.json'));

// Tạo route hiển thị danh sách người nổi tiếng
app.get('/', (req, res) => {
  const genderFilter = req.query['gioi-tinh'];
  let filteredCelebrities = celebrities;

  // Lọc theo giới tính nếu có query parameter
  if (genderFilter) {
    filteredCelebrities = celebrities.filter(
      celeb => celeb.gender === genderFilter
    );
  }

  res.render('index', { celebrities: filteredCelebrities });
});

// Tạo route hiển thị chi tiết người nổi tiếng
app.get('/:name', (req, res) => {
  const name = req.params.name;
  const celebrity = celebrities.find(celeb => celeb.name === name);

  if (celebrity) {
    res.render('celebrity', { celebrity });
  } else {
    res.status(404).send('Celebrity not found');
  }
});

// Static folder cho ảnh
app.use(express.static(path.join(__dirname, 'public')));

// Khởi động server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
