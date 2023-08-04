const fs = require("fs");
const path = require("path");

const code = `
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>hello world</div>;

ReactDOM.render(<App />, document.getElementById('root'));
`;

const filePath = path.join(__dirname, "/", "YourFile.tsx"); // Değiştirilmesi gereken yerler: 'your-folder-path' ve 'YourFile.tsx'

fs.writeFile(filePath, code, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error("Bir hata oluştu:", err);
  } else {
    console.log("Dosya başarıyla oluşturuldu ve kaydedildi.");
  }
});
