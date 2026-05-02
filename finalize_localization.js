const fs = require('fs');

// Fix Brazil Quiz
let br = fs.readFileSync('quiz_br.html', 'utf8');
br = br.replace(/€/g, 'R$')
       .replace(/aplicativoly/g, 'apply')
       .replace(/aplicativoendChild/g, 'appendChild')
       .replace(/As suas fotos estão a afastar/g, 'Suas fotos estão afastando')
       .replace(/Se pudesse fazer isto/g, 'Se pudesse fazer isso')
       .replace(/mudava as suas vendas/g, 'mudaria suas vendas')
       .replace(/Que tipo de produto faz com as suas mãos/g, 'Que tipo de produto você faz com as suas mãos')
       .replace(/O seu negócio está pronto/g, 'Seu negócio está pronto')
       .replace(/O seu diagnóstico está pronto/g, 'Seu diagnóstico está pronto');

fs.writeFileSync('quiz_br.html', br, 'utf8');

// Fix Spanish Quiz
let es = fs.readFileSync('quiz_es.html', 'utf8');
es = es.replace(/€/g, '$')
       .replace(/aplicativoly/g, 'apply')
       .replace(/aplicativoendChild/g, 'appendChild')
       .replace(/maño/g, 'mano'); // Correcting a typo I might have made ("maño" -> "mano")

fs.writeFileSync('quiz_es.html', es, 'utf8');

console.log('Quizzes localized correctly and JS fixed!');
