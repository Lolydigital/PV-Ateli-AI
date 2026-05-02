const fs = require('fs');
const files = ['quiz_funil_completo_v2.html', 'quiz_br.html', 'quiz_es.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add Viewport Meta Tag if missing
    if (!content.includes('viewport')) {
        content = content.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    }

    // 2. Increase font sizes for better readability (Targeting 30-65 years old audience)
    content = content.replace(/font-size:13px/g, 'font-size:15px');
    content = content.replace(/font-size:14px/g, 'font-size:16px');
    
    // Fix any collateral damage to clamp or other specific sizes if necessary
    // But usually 13->15 and 14->16 is a safe bet for this simple CSS.

    // 3. Ensure the wrap padding is comfortable
    content = content.replace('.wrap{max-width:500px;', '.wrap{max-width:500px; width:100%;');

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Quizzes are now responsive and have larger fonts!');
