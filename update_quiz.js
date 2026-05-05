const fs = require('fs');

let html = fs.readFileSync('quiz_funil_completo_v2.html', 'utf8');

// 1. Replace Images
html = html.replace(
  '<img src="/mnt/user-data/uploads/3.png" style="object-position:left center;" alt="antes">',
  '<img src="img/vela_antes.jpeg" style="object-position:left center;" alt="antes">'
);
html = html.replace(
  '<img src="/mnt/user-data/uploads/3.png" style="object-position:right center;" alt="depois">',
  '<img src="img/vela_depois.jpeg" style="object-position:right center;" alt="depois">'
);

// 2. Insert iPhone Mockup CSS
const cssMockup = `
/* MOCKUP IPHONE */
.iphone-frame {
  position: relative;
  width: 260px;
  height: 520px;
  margin: 30px auto;
  background: #1a1a1a;
  border-radius: 44px;
  padding: 11px;
  box-shadow: 0 50px 100px -20px rgba(0,0,0,0.4), 0 30px 60px -30px rgba(0,0,0,0.5);
  border: 1px solid #444;
  z-index: 2;
  animation: float 6s ease-in-out infinite;
}
.iphone-frame::before {
  content: '';
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 20px;
  background: #000;
  border-radius: 20px;
  z-index: 10;
}
.iphone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 34px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}
.iphone-screen iframe {
  width: 100%;
  height: 100%;
  border: none;
  transform: scale(1.05);
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
`;
html = html.replace('</style>', cssMockup + '</style>');

// 3. Insert iPhone Mockup HTML in Step 9
const mockupHtml = `
  <div class="iphone-frame">
    <div class="iphone-screen">
      <iframe id="main-video-iframe"
        src="https://www.youtube.com/embed/mEOoLSFqcsM?autoplay=1&loop=1&playlist=mEOoLSFqcsM&controls=0&showinfo=0&rel=0&modestbranding=1" 
        title="Demonstração Ateliê Criativo" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
`;
html = html.replace('<div class="result-box">', mockupHtml + '<div class="result-box">');

// 4. Modify IDs for dynamic linking
html = html.replace('<div class="pc-price"><div class="pc-old">€14,90/mês</div><div class="pc-val">€7,90</div><div class="pc-period">/mês</div></div>', '<div class="pc-price"><div class="pc-old">€14,90/mês</div><div class="pc-val">€<span id="price_mensal">7,90</span></div><div class="pc-period">/mês</div></div>');
html = html.replace('<div class="pc-price"><div class="pc-old">€94,90/ano</div><div class="pc-val">€39,90</div><div class="pc-period">/ano</div></div>', '<div class="pc-price"><div class="pc-old">€94,90/ano</div><div class="pc-val">€<span id="price_anual">39,90</span></div><div class="pc-period">/ano</div></div>');
html = html.replace('<div class="pc-price"><div class="pc-old">€197</div><div class="pc-val">€97</div><div class="pc-period">única vez</div></div>', '<div class="pc-price"><div class="pc-old">€197</div><div class="pc-val">€<span id="price_vitalicio">97</span></div><div class="pc-period">única vez</div></div>');
html = html.replace('onclick="sendPrompt(\'Quero aceder ao Ateliê Criativo agora — vi no quiz\')"', 'id="checkout_vitalicio" href="https://pay.hotmart.com/Y105490525B" style="text-decoration:none;"');

// Add links to Mensal and Anual blocks
html = html.replace('<div class="pc">', '<a class="pc" id="checkout_mensal_card" href="https://pay.hotmart.com/Y105492438A?off=lufkir3m" style="text-decoration:none; display:block; color:inherit;">');
html = html.replace('</div>\n    <div class="pc best">', '</a>\n    <a class="pc best" id="checkout_anual_card" href="https://pay.hotmart.com/Y105492438A?off=ff49t67u" style="text-decoration:none; display:block; color:inherit;">');
html = html.replace('</div>\n    <div class="pc">', '</a>\n    <a class="pc" id="checkout_vitalicio_card" href="https://pay.hotmart.com/Y105490525B" style="text-decoration:none; display:block; color:inherit;">');
// Fix closing tags for PC
html = html.replace('</div>\n  </div>\n\n  <button class="cta-btn"', '</a>\n  </div>\n\n  <a class="cta-btn"');
html = html.replace('</button>\n  <p class="cta-sub">', '</a>\n  <p class="cta-sub">');

// 5. Replace Javascript
const newJs = `
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
const SUPABASE_URL = 'https://sdnnpgeynzqwuruvanja.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Hbv2XnAyGQF87ma1nUJIFg_Gwhgb3sP';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let quizId = 'quiz-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

let cur = 1;
const total = 9;

// Track step view on load
supabaseClient.from('analytics_events').insert([{
    event_type: 'quiz_step',
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    coordinates: { step: 1, session_id: quizId }
}]);

function go(n){
  document.getElementById('s'+cur).classList.remove('on');
  cur = n;
  document.getElementById('s'+cur).classList.add('on');
  const pct = Math.round(((cur-1)/(total-1))*100);
  document.getElementById('pf').style.width = pct+'%';
  document.getElementById('pl').textContent = cur === 1 ? 'Início' : cur === total ? 'Concluído!' : 'Passo '+(cur-1)+' de '+(total-2);
  window.scrollTo(0,0);

  // Enviar evento Supabase
  supabaseClient.from('analytics_events').insert([{
      event_type: 'quiz_step',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      coordinates: { step: cur, session_id: quizId }
  }]);
}

async function loadQuizSettings() {
    try {
        const { data: settings } = await supabaseClient.from('site_settings').select('*').eq('id', 1).single();
        if (settings) {
            // Atualiza vídeo
            if (settings.video_url) {
                const videoIframe = document.getElementById('main-video-iframe');
                if (videoIframe) {
                    let videoId = '';
                    const url = settings.video_url;
                    if (url.includes('shorts/')) videoId = url.split('shorts/')[1].split('?')[0];
                    else if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
                    else if (url.includes('be/')) videoId = url.split('be/')[1].split('?')[0];
                    
                    if (videoId) {
                        videoIframe.src = \`https://www.youtube.com/embed/\${videoId}?autoplay=1&mute=1&loop=1&playlist=\${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1\`;
                    }
                }
            }
            
            // Atualiza Preços
            if (settings.price) document.getElementById('price_vitalicio').innerText = settings.price;
            
            // Atualiza Links de Checkout
            if (settings.checkout_link) {
                document.getElementById('checkout_vitalicio').href = settings.checkout_link;
                document.getElementById('checkout_vitalicio_card').href = settings.checkout_link;
            }
            if (settings.checkout_anual) document.getElementById('checkout_anual_card').href = settings.checkout_anual;
            if (settings.checkout_mensal) document.getElementById('checkout_mensal_card').href = settings.checkout_mensal;

            // Injeta Pixels Numéricos (Pegamos o mesmo de Portugal)
            if (settings.pixels && Array.isArray(settings.pixels)) {
                settings.pixels.forEach(id => {
                    if (id) {
                        const script = document.createElement('script');
                        script.innerHTML = \`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '\${id}');fbq('track', 'PageView');\`;
                        document.head.appendChild(script);
                    }
                });
            }

            // Injetar Pixel via Script HTML
            if (settings.pixel_html) {
                const container = document.createElement('div');
                container.innerHTML = settings.pixel_html;
                const scripts = container.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                    document.head.appendChild(newScript);
                });
            }
        }
    } catch(err) {
        console.error('Erro', err);
    }
}
async function sendCapiEvent(eventName, eventId, userData = {}) {
    try {
        await fetch('/api/meta-capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_name: eventName,
                event_id: eventId,
                event_url: window.location.href,
                user_data: userData
            })
        });
    } catch (err) {
        console.error('Erro CAPI:', err);
    }
}

document.addEventListener('click', (e) => {
  // Rastreio manual removido para evitar duplicação com CAPI Hotmart
});

document.addEventListener('DOMContentLoaded', loadQuizSettings);
</script>
`;

html = html.replace(/<script>[\s\S]*?<\/script>/, newJs);

fs.writeFileSync('quiz_funil_completo_v2.html', html, 'utf8');
console.log('Quiz updated successfully.');
