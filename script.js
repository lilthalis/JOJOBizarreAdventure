const characters=[
 {type:'hero',id:'giorno',name:'Giorno Giovanna',theme:'Gold Experience Requiem',colors:['#f5c84b','#6d36ff'],text:'Golden particles, light rays and a luxury glow answer the dream of a new order.',action:'Return To Zero'},
 {type:'hero',id:'johnny',name:'Johnny Joestar',theme:'Tusk Act 4',colors:['#2f7cff','#f7fbff'],text:'Infinite spin bends the archive into a blue-white gravitational hymn.',action:'Infinite Rotation'},
 {type:'hero',id:'jodio',name:'Jodio Joestar',theme:'November Rain',colors:['#063b28','#050505'],text:'Dark green pressure gathers overhead until rain becomes a character.',action:'Heavy Rain Sequence'},
 {type:'hero',id:'josuke4',name:'Josuke Higashikata',theme:'Crazy Diamond',colors:['#7a2cff','#ff4fd8'],text:'Cracks, kindness and pink healing fragments reconstruct the impossible.',action:'Repair the Broken'},
 {type:'hero',id:'josuke8',name:'Josuke Part 8',theme:'Soft & Wet',colors:['#bfc7d5','#4aa3ff'],text:'Silver-blue bubbles steal properties from the room and return them gently.',action:'Plunder Visibility'},
 {type:'villain',id:'dio',name:'DIO Brando',theme:'The World',colors:['#f5c84b','#050505'],text:'Gold over black. Time itself kneels under a predatory museum spotlight.',action:'TIME STOP'},
 {type:'villain',id:'diavolo',name:'Diavolo',theme:'King Crimson',colors:['#d20b23','#330007'],text:'Crimson frames skip, causality tears, and the next moment arrives wounded.',action:'Erase Time'},
 {type:'villain',id:'kira',name:'Yoshikage Kira',theme:'Killer Queen',colors:['#ff9ad8','#d8c2a7'],text:'Elegant beige-pink danger blooms into silent explosions and instant repair.',action:'Detonate Exhibit'},
 {type:'villain',id:'diego',name:'Diego Brando',theme:'Scary Monsters',colors:['#1ba85d','#062d16'],text:'Dinosaur silhouettes race through green archival glass.',action:'Prehistoric Shift'},
 {type:'villain',id:'valentine',name:'Funny Valentine',theme:'D4C',colors:['#c8172c','#f4f4f4'],text:'Red, white and blue mirror doors open onto patriotic parallel worlds.',action:'Open Universes'}
];

gsap.registerPlugin(ScrollTrigger);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis=!reduce&&window.Lenis?new Lenis({lerp:.075,wheelMultiplier:.9}):null;
if(lenis){function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);}

const orb=document.querySelector('.cursor-orb');
addEventListener('pointermove',e=>{orb.style.left=e.clientX+'px';orb.style.top=e.clientY+'px'});

gsap.timeline().from('.birthmark',{scale:0,rotation:180,duration:1.2,ease:'back.out(1.7)'})
 .from('.narrator',{opacity:0,y:20,duration:.8}).from('.hero h1',{opacity:0,y:60,duration:1},'-=.2')
 .from('.subtitle,.intro-copy,.cta',{opacity:0,y:28,stagger:.12},'-=.35')
 .to('.left-wing',{xPercent:-100,duration:1.4,ease:'power4.inOut'},'-=.8').to('.right-wing',{xPercent:100,duration:1.4,ease:'power4.inOut'},'<');

gsap.utils.toArray('.panel-section').forEach(section=>{gsap.from(section,{clipPath:'inset(12% 12% 12% 12%)',opacity:.35,scrollTrigger:{trigger:section,start:'top 75%',end:'top 25%',scrub:1}})});
gsap.utils.toArray('.manga-panel').forEach(p=>gsap.from(p,{x:()=>gsap.utils.random(-120,120),rotate:()=>gsap.utils.random(-6,6),opacity:0,scrollTrigger:{trigger:p,start:'top 82%'}}));
gsap.to('.close-left',{xPercent:100,scrollTrigger:{trigger:'#ending',start:'top 55%',end:'bottom bottom',scrub:true}});
gsap.to('.close-right',{xPercent:-100,scrollTrigger:{trigger:'#ending',start:'top 55%',end:'bottom bottom',scrub:true}});

function makeCard(c){const el=document.createElement('article');el.className='card';el.dataset.id=c.id;el.style.setProperty('--c1',c.colors[0]);el.style.setProperty('--c2',c.colors[1]);el.innerHTML=`<div class="portrait" data-stand="${c.theme}"></div><div class="stand">${c.theme}</div><h3>${c.name}</h3><div class="theme">${c.theme}</div><p>${c.text}</p><div class="action">Click: ${c.action}</div>`;el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',`${e.clientX-r.left}px`);el.style.setProperty('--my',`${e.clientY-r.top}px`)});el.addEventListener('mouseenter',()=>summon(el,c,true));el.addEventListener('click',()=>activate(c,el));return el;}
characters.forEach(c=>document.getElementById(c.type==='hero'?'heroCards':'villainCards').appendChild(makeCard(c)));

const wheel=document.querySelector('.character-wheel');characters.forEach((c,i)=>{const item=document.createElement('button');item.className='wheel-item';item.style.setProperty('--c1',c.colors[0]);item.style.setProperty('--c2',c.colors[1]);item.style.transform=`rotate(${i*36}deg) translate(${Math.min(innerWidth*.31,330)}px) rotate(${-i*36}deg)`;item.textContent=c.name.split(' ')[0];item.addEventListener('click',()=>document.querySelector(`[data-id="${c.id}"]`).scrollIntoView({behavior:'smooth',block:'center'}));wheel.appendChild(item)});

function summon(el,c,hover=false){gsap.to(el.querySelector('.stand'),{opacity:hover?.72:1,filter:'blur(0px)',x:-30,scale:1,duration:.7,ease:'power3.out'});particles(c.colors[0],hover?14:38,el.getBoundingClientRect());if(c.id==='jodio')rain(.35,900);if(c.id==='josuke8')document.body.classList.add('invisible'),setTimeout(()=>document.body.classList.remove('invisible'),800);}
function particles(color,count,rect){for(let i=0;i<count;i++){const p=document.createElement('i');p.className='particle';p.style.background=color;document.body.appendChild(p);gsap.set(p,{x:rect.left+rect.width/2,y:rect.top+rect.height/2});gsap.to(p,{x:`+=${gsap.utils.random(-220,220)}`,y:`+=${gsap.utils.random(-180,180)}`,scale:0,opacity:0,duration:gsap.utils.random(.7,1.6),onComplete:()=>p.remove()})}}
function rain(opacity=1,time=3000){const field=document.querySelector('.rain-field');field.innerHTML='';for(let i=0;i<90;i++){const d=document.createElement('i');d.style.cssText=`position:absolute;left:${Math.random()*100}%;top:${Math.random()*-100}%;height:${30+Math.random()*70}px;border-left:1px solid #9bd3ff;opacity:.55`;field.appendChild(d);gsap.to(d,{y:innerHeight*1.4,duration:.8+Math.random(),repeat:-1,ease:'none'})}gsap.to(field,{opacity,duration:.2});setTimeout(()=>gsap.to(field,{opacity:0,duration:.8,onComplete:()=>field.innerHTML=''}),time)}
function activate(c,el){summon(el,c,false);const root=document.documentElement;if(c.id==='giorno')gsap.to('.card,.manga-panel',{x:0,y:0,rotate:0,scale:1,duration:1,ease:'elastic.out(1,.5)'});if(c.id==='johnny')gsap.to('.birthmark,.wheel-core',{rotation:'+=1440',duration:3,ease:'power2.inOut'});if(c.id==='jodio')rain(1,4200);if(c.id==='josuke4')gsap.fromTo(el,{clipPath:'polygon(0 0,100% 0,92% 100%,8% 86%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)',duration:1});if(c.id==='josuke8'){document.body.classList.add('invisible');setTimeout(()=>document.body.classList.remove('invisible'),1800)}if(c.id==='dio')timeStop();if(c.id==='diavolo'){document.body.classList.add('glitch');scrollBy({top:innerHeight*.7,behavior:'smooth'});setTimeout(()=>document.body.classList.remove('glitch'),1600)}if(c.id==='kira')gsap.fromTo(el,{scale:1.08,filter:'brightness(4)'},{scale:1,filter:'brightness(1)',duration:1.1,ease:'bounce.out'});if(c.id==='diego'){document.body.classList.add('prehistoric');setTimeout(()=>document.body.classList.remove('prehistoric'),3600)}if(c.id==='valentine')parallelUniverses();}
function timeStop(){const clock=document.querySelector('.time-clock');clock.classList.add('show');document.body.classList.add('frozen');lenis?.stop();gsap.globalTimeline.pause();setTimeout(()=>{gsap.globalTimeline.resume();clock.classList.remove('show');document.body.classList.remove('frozen');lenis?.start()},5000)}
function parallelUniverses(){for(let i=0;i<3;i++){const clone=document.querySelector('#app').cloneNode(true);clone.style.cssText=`position:fixed;inset:0;z-index:18;pointer-events:none;opacity:.22;transform:translate(${(i-1)*28}px,${(i-1)*18}px) scale(${1-i*.03});filter:hue-rotate(${i*70}deg)`;document.body.appendChild(clone);setTimeout(()=>clone.remove(),900+i*260)}}
