const fs = require('fs');
const files = ['quiz_funil_completo_v2.html', 'quiz_br.html', 'quiz_es.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove the back button (Voltar / Volver)
    content = content.replace(/<span class="back" onclick="go\(\d+\)">← (Voltar|Volver)<\/span>\s*/g, '');

    // Replace the emoji gallery with real images
    const newGal = `<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin:18px 0 22px;">
    <img src="img/boneco_depois.jpeg" style="width:100%; height:120px; object-fit:cover; border-radius:10px;" alt="Artesanato">
    <img src="img/piramide_depois.jpeg" style="width:100%; height:120px; object-fit:cover; border-radius:10px;" alt="Papelaria">
    <img src="img/vela_depois.jpeg" style="width:100%; height:120px; object-fit:cover; border-radius:10px;" alt="Velas">
    <img src="img/amigurumi_depois.jpeg" style="width:100%; height:120px; object-fit:cover; border-radius:10px;" alt="Amigurumi">
  </div>$1`;

    content = content.replace(/<div class="gal">[\s\S]*?<\/div>(\s*<p style="font-size:14px)/, newGal);

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Quizzes updated!');
