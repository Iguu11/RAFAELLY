const moments = [
  { title:'Nosso começo', img:'assets/foto1.jpg', msg:'Tudo começou de uma forma simples, mas sem eu perceber você se tornou a parte mais importante dos meus dias.' },
  { title:'Seu sorriso', img:'assets/foto2.jpg', msg:'Existem muitos lugares bonitos no mundo, mas poucos conseguem transmitir a paz que sinto quando vejo você sorrir.' },
  { title:'Meu lugar favorito', img:'assets/foto3.jpg', msg:'Entre tantos lugares, o meu favorito sempre vai ser nos seus braços.' },
  { title:'Nossos momentos', img:'assets/foto4.jpg', msg:'conhecer lugares novos é bom, mas a verdade é que nenhum lugar supera a alegria que é caminhar do seu lado. Que a gente continue conquistando nosso espaço e desenhando nossa história juntos. Amo você ❤️' },
  { title:'Beleza em Todos os Detalhes', img:'assets/foto5.jpg', msg:'Até os momentos mais simples se tornam especiais quando têm você.' },
  { title:'Para sempre nós', img:'assets/foto6.jpg', msg:'Que a gente continue escolhendo o abraço um do outro todos os dias, descobrindo que o nosso lugar favorito é um ao outro.' }
];

const finalLetter = `Rafaelly,

Eu queria conseguir explicar em palavras o quanto você é especial para mim, mas a verdade é que nem todas as palavras do mundo seriam suficientes.
Você chegou na minha vida de um jeito único e, aos poucos, foi se tornando meu lugar de paz, meu sorriso mais sincero e uma das partes mais bonitas da minha história.
Cada momento ao seu lado fica guardado em mim como uma cena que eu gostaria de assistir de novo e de novo. Seu jeito, seu carinho, sua presença e até os pequenos detalhes que talvez você nem perceba fazem meus dias serem melhores.
Esse site é só uma pequena forma de te mostrar que nossa história merece ser lembrada, cuidada e celebrada. Que cada foto, cada mensagem e cada detalhe aqui te lembre do quanto você é amada.
Obrigado por ser você. Obrigado por fazer parte da minha vida. Obrigado por ser minha Rafaelly.
Eu te amo muito, hoje e sempre. ❤️

Com amor,
Igor`;

let letterStarted = false;
let typingAudio = null;
let typingTimer = null;

function playNetflixIntro(){
  const audio = new Audio('assets/netflix-intro.mp3');
  audio.volume = 0.95;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function enterNetflix(){
  playNetflixIntro();
  document.getElementById('profiles').classList.add('hidden');
  const intro = document.getElementById('intro');
  intro.classList.remove('hidden');
  setTimeout(() => {
    intro.classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 6200);
}

function backProfiles(){
  document.getElementById('app').classList.add('hidden');
  document.getElementById('profiles').classList.remove('hidden');
}

function render(){
 const cards=document.getElementById('cards');
 const messages=document.getElementById('messages');
 moments.slice(0,6).forEach((m,i)=>cards.innerHTML+=cardHtml(m,i));
 moments.slice(0,4).forEach((m,i)=>messages.innerHTML+=cardHtml(m,i));
}

function cardHtml(m,i){
  return `<button class="card" onclick="openMoment(${i})"><img src="${m.img}" onerror="this.src='assets/placeholder-card.svg'" alt="${m.title}"><div class="card-title">${m.title}</div></button>`;
}

function openMoment(i){
  const m=moments[i];
  document.getElementById('modalImg').src=m.img;
  document.getElementById('modalTitle').textContent=m.title;
  document.getElementById('modalMsg').textContent=m.msg;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal(){
  document.getElementById('modal').classList.add('hidden');
}



function stopTypingAudio(){
  if(typingTimer){
    clearTimeout(typingTimer);
    typingTimer = null;
  }

  if(typingAudio){
    typingAudio.pause();
    typingAudio.currentTime = 0;
  }
}

function keepTypingAudioRunning(){
  if(!typingAudio) return;

  // Garante que o som continue acompanhando a escrita até o fim.
  if(typingAudio.paused || typingAudio.ended){
    typingAudio.currentTime = 0;
    typingAudio.play().catch(()=>{});
  }
}

function startTypewriter(){
  const box = document.getElementById('typedLetter');
  const cursor = document.getElementById('typeCursor');

  stopTypingAudio();

  letterStarted = true;
  box.textContent = '';
  cursor.classList.remove('hidden');

  typingAudio = new Audio('assets/typing.mp3');
  typingAudio.loop = true;
  typingAudio.volume = 0.65;
  typingAudio.currentTime = 0;
  typingAudio.addEventListener('ended', () => {
    typingAudio.currentTime = 0;
    typingAudio.play().catch(()=>{});
  });
  typingAudio.play().catch(()=>{});

  let i = 0;

  function write(){
    if(i < finalLetter.length){
      const char = finalLetter.charAt(i);
      box.textContent += char;

      if(char.trim()){
        keepTypingAudioRunning();
      }

      i++;
      typingTimer = setTimeout(write, char === '\n' ? 240 : 42);
    }else{
      cursor.classList.add('hidden');
      stopTypingAudio();
    }
  }

  write();
}

function openLetter(){
  document.getElementById('letterOverlay').classList.remove('hidden');
  startTypewriter();
}

function closeLetter(){
  document.getElementById('letterOverlay').classList.add('hidden');
  stopTypingAudio();
}

render();

