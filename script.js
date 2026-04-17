/* ══════════════════════════════════════
   YASSINE MANSOURI — script.js
   ══════════════════════════════════════ */

/* ─── 1. CURSOR ─── */
const cur  = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
});
(function loop(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  cur2.style.left=rx+'px'; cur2.style.top=ry+'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.pc,.card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur2.style.width='44px';cur2.style.height='44px';cur2.style.borderColor='var(--red2)'});
  el.addEventListener('mouseleave',()=>{cur2.style.width='30px';cur2.style.height='30px';cur2.style.borderColor='var(--gold)'});
});

/* ─── 2. CANVAS PARTICLES ─── */
const cvs=document.getElementById('cvs'),ctx=cvs.getContext('2d');
function resize(){cvs.width=window.innerWidth;cvs.height=window.innerHeight;}
resize(); window.addEventListener('resize',resize);

/* palette: rouge, vert, or */
const COLS=['rgba(181,32,32,','rgba(26,107,53,','rgba(196,154,10,'];

class P{
  constructor(){this.init(true)}
  init(r=false){
    this.x=r?Math.random()*cvs.width:(Math.random()>.5?-5:cvs.width+5);
    this.y=r?Math.random()*cvs.height:Math.random()*cvs.height;
    this.vx=(Math.random()-.5)*.35; this.vy=(Math.random()-.5)*.35;
    this.sz=Math.random()*1.3+.3;
    this.a=Math.random()*.45+.05; this.da=(Math.random()-.5)*.004;
    this.c=COLS[Math.floor(Math.random()*COLS.length)];
  }
  step(){
    this.x+=this.vx; this.y+=this.vy; this.a+=this.da;
    if(this.a<.04||this.a>.58)this.da*=-1;
    if(this.x<-10||this.x>cvs.width+10||this.y<-10||this.y>cvs.height+10)this.init();
  }
  draw(){
    ctx.beginPath();ctx.arc(this.x,this.y,this.sz,0,Math.PI*2);
    ctx.fillStyle=this.c+this.a+')';ctx.fill();
  }
}

const pts=Array.from({length:110},()=>new P());

function conns(){
  for(let i=0;i<pts.length-1;i++){
    for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){
        ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(196,154,10,${.055*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();
      }
    }
  }
}
(function anim(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
  pts.forEach(p=>{p.step();p.draw()});conns();
  requestAnimationFrame(anim);
})();

/* ─── 3. TYPEWRITER ─── */
const phrases=[
  'Administrateur Réseaux & Systèmes',
  'Passionné de Cybersécurité',
  'Étudiant BTS SIO SISR',
  'Expert Linux · Windows Server',
  'Futur Technicien Informatique',
];
let pi=0,ci=0,del=false;
const tel=document.getElementById('typed');
function type(){
  const cur2=phrases[pi];
  del?tel.textContent=cur2.slice(0,--ci):tel.textContent=cur2.slice(0,++ci);
  if(!del&&ci===cur2.length)setTimeout(()=>{del=true},2000);
  else if(del&&ci===0){del=false;pi=(pi+1)%phrases.length}
  setTimeout(type,del?55:95);
}type();

/* ─── 4. NAV SCROLL + ACTIVE ─── */
const nav=document.getElementById('nav');
const nlinks=document.querySelectorAll('#nul a[data-s]');
const secs=document.querySelectorAll('section[id]');

window.addEventListener('scroll',()=>{
  nav.classList.toggle('sc2',window.scrollY>30);
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id});
  nlinks.forEach(a=>a.classList.toggle('act',a.dataset.s===cur));
},{passive:true});

/* ─── 5. BURGER ─── */
const brgr=document.getElementById('brgr'),nul=document.getElementById('nul');
brgr.addEventListener('click',()=>nul.classList.toggle('open'));
nul.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nul.classList.remove('open')));

/* ─── 6. REVEAL ─── */
new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i%5*80);revObs.unobserve(e.target)}
  });
},{threshold:.12}).observe; // trick: need named ref
const revObs=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i%5*80);revObs.unobserve(e.target)}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ─── 7. ANIMATED BARS ─── */
const bObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.style.width=e.target.dataset.v+'%';bObs.unobserve(e.target)}
  });
},{threshold:.3});
document.querySelectorAll('.sbf,.lf').forEach(b=>bObs.observe(b));

/* ─── 8. PROJECT FILTER ─── */
document.querySelectorAll('.fb').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.fb').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    document.querySelectorAll('.pc').forEach(card=>{
      const show=f==='all'||card.dataset.cat===f;
      card.classList.toggle('hid',!show);
      if(show){card.classList.remove('in');setTimeout(()=>card.classList.add('in'),50)}
    });
  });
});

/* ─── 9. CONTACT FORM ─── */
document.getElementById('ctf').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('fn').value.trim();
  const em=document.getElementById('fe').value.trim();
  const s=document.getElementById('fs').value.trim();
  const m=document.getElementById('fm').value.trim();
  window.location.href=`mailto:mansouriyassine99@gmail.com?subject=${encodeURIComponent(s||'Contact portfolio')}&body=${encodeURIComponent(`Nom : ${n}\nEmail : ${em}\n\n${m}`)}`;
  const note=document.getElementById('fnote');
  note.textContent='✅ Votre client mail va s\'ouvrir — merci !';
  e.target.reset();
  setTimeout(()=>{note.textContent=''},5000);
});

/* ─── 10. HERO ENTRANCE ─── */
window.addEventListener('load',()=>{
  const hl=document.querySelector('.hl');
  if(!hl)return;
  hl.style.cssText='opacity:0;transform:translateY(28px);transition:opacity 1s .2s ease,transform 1s .2s ease';
  requestAnimationFrame(()=>{hl.style.opacity='1';hl.style.transform='none'});
});
