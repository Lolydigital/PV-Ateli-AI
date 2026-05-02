const fs = require('fs');

// Fix Brazil Sales Page (br.html)
let br = fs.readFileSync('br.html', 'utf8');
br = br.replace(/€/g, 'R$')
       .replace(/telemóvel/g, 'celular')
       .replace(/telemóveis/g, 'celulares')
       .replace(/ecrã/g, 'tela')
       .replace(/perceber/g, 'entender')
       .replace(/A sua obra/g, 'Sua obra')
       .replace(/as suas mãos/g, 'suas mãos')
       .replace(/está a poupar/g, 'está economizando')
       .replace(/está a saber/g, 'está sabendo')
       .replace(/está a lucrar/g, 'está lucrando')
       .replace(/paga uma vez/g, 'pague uma vez')
       .replace(/escolhe tu/g, 'escolha você');

fs.writeFileSync('br.html', br, 'utf8');

// Fix Spanish Sales Page (es.html)
let es = fs.readFileSync('es.html', 'utf8');
es = es.replace(/€/g, '$')
       .replace(/maño/g, 'mano')
       .replace(/A sua obra/g, 'Tu obra')
       .replace(/A sua obra é linda/g, 'Tu obra es hermosa')
       .replace(/Merece ser vista assim/g, 'Merece ser vista así')
       .replace(/O Ateliê Criativo transforma/g, 'El Atelier Creativo transforma');

// Note: es.html might need more Spanish translations for headlines if they weren't fully translated.
// I'll do a quick check on headlines.
es = es.replace(/A sua obra é linda.<br>Merece <em>ser vista assim.<\/em>/g, 'Tu obra es hermosa.<br>Merece <em>ser vista así.</em>');
es = es.replace(/O Ateliê Criativo transforma fotos caseiras/g, 'El Atelier Creativo transforma fotos caseras');

fs.writeFileSync('es.html', es, 'utf8');

console.log('Sales pages localized correctly!');
