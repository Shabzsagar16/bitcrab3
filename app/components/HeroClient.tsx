'use client';
import { useEffect } from 'react';

export default function HeroClient(){
  useEffect(()=>{
    // Inject existing main.js behaviors scoped to the page after mount
    // To keep parity, we dynamically import the original script content.
    // However, we re-implement minimal required parts for safety.
    const $ = (s: string, el: Document | HTMLElement = document)=> el.querySelector(s) as HTMLElement;
    const $$ = (s: string, el: Document | HTMLElement = document)=> Array.from(el.querySelectorAll(s)) as HTMLElement[];

    // Mobile nav toggle
    const toggle = $('.nav__toggle');
    const menu = $('#nav-menu');
    toggle?.addEventListener('click', ()=>{
      const open = menu?.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(!!open));
    });

    // Copy contract
    const copyBtn = $('#copy-contract');
    const contract = $('#contract-addr');
    copyBtn?.addEventListener('click', async ()=>{
      const addr = contract?.dataset.address || '';
      try{
        await navigator.clipboard.writeText(addr);
        copyBtn.textContent = 'Copied!';
        setTimeout(()=>copyBtn.textContent='Copy', 1500);
      }catch{
        const r = document.createRange(); r.selectNode(contract!);
        const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(r);
        document.execCommand('copy'); sel?.removeAllRanges();
        copyBtn.textContent = 'Copied!'; setTimeout(()=>copyBtn.textContent='Copy', 1500);
      }
    });

    // Year
    const y = new Date().getFullYear();
    const year = $('#year'); if(year) year.textContent = String(y);

    // Reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){ if(e.isIntersecting){ (e.target as HTMLElement).classList.add('in'); io.unobserve(e.target);} }
    },{threshold:0.15});
    $$('.reveal').forEach(el=>io.observe(el));

    // Accordion
    $$('.acc').forEach(acc=>{
      const btn = $('.acc__btn', acc as HTMLElement);
      const panel = $('.acc__panel', acc as HTMLElement);
      btn?.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        (acc as HTMLElement).setAttribute('aria-expanded', String(!expanded));
      });
    });

    // Bubbles
    const canvas = $('.bubbles') as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');
    const bubbles = Array.from({length: 50}, ()=>({
      x: Math.random()*window.innerWidth,
      y: window.innerHeight + Math.random()*200,
      r: 1 + Math.random()*3,
      s: .5 + Math.random()*1.5
    }));
    function resize(){ if(!canvas) return; canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function draw(){ if(!canvas||!ctx) return; ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle='rgba(255,255,255,.18)';
      for(const b of bubbles){ ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill(); b.y-=b.s; b.x+=Math.sin(b.y/50)*0.2; if(b.y<-20){ b.y=canvas.height+Math.random()*50; b.x=Math.random()*canvas.width; } }
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize(); draw();

    // Brand wobble
    const brandImg = document.querySelector('.brand__img') as HTMLElement | null;
    if(brandImg){ brandImg.style.transition='transform .5s ease'; setTimeout(()=>{ brandImg.style.transform='rotate(-6deg) scale(1.05)'; }, 350); setTimeout(()=>{ brandImg.style.transform=''; }, 1200); }

    // Count-up stats
    const statSpans = document.querySelectorAll('[data-count]') as NodeListOf<HTMLElement>;
    if(statSpans.length){
      const fmt = new Intl.NumberFormat('en-US');
      const statsIO = new IntersectionObserver((entries)=>{
        for(const e of entries){ if(!e.isIntersecting) continue; const el = e.target as HTMLElement; statsIO.unobserve(el);
          const target = Number(el.getAttribute('data-count')||'0'); const start=performance.now(); const dur=1400;
          function tick(t:number){ const p=Math.min(1,(t-start)/dur); const eased=1-Math.pow(1-p,3); const val=Math.floor(target*eased); el.textContent=fmt.format(val); if(p<1) requestAnimationFrame(tick); }
          requestAnimationFrame(tick);
        }
      }, {threshold:0.4});
      statSpans.forEach(s=>statsIO.observe(s));
    }

    // Ripple
    const clickRipple = (e: MouseEvent)=>{
      const target = (e.target as HTMLElement).closest('.btn, .copy') as HTMLElement | null; if(!target) return;
      const rect = target.getBoundingClientRect(); const span = document.createElement('span'); span.className='ripple';
      const size=Math.max(rect.width, rect.height); span.style.width=span.style.height=size+'px';
      span.style.left=(e.clientX-rect.left-size/2)+'px'; span.style.top=(e.clientY-rect.top-size/2)+'px'; target.appendChild(span); setTimeout(()=>span.remove(),650);
    };
    document.addEventListener('click', clickRipple, {passive:true});

    // Shell burst
    const burstLayer = document.querySelector('.burst');
    function shellBurst(x:number,y:number,count=10){ if(!burstLayer) return; for(let i=0;i<count;i++){ const s=document.createElement('div'); s.className='burst__shell'; const img=document.createElement('img'); img.src='/assets/svg/shell.svg'; img.alt=''; s.appendChild(img); s.setAttribute('style',`left:${x}px;top:${y}px`); burstLayer.appendChild(s);
      const ang=Math.random()*Math.PI*2; const dist=40+Math.random()*90; const tx=Math.cos(ang)*dist; const ty=Math.sin(ang)*dist; requestAnimationFrame(()=>{ s.style.opacity='1'; s.style.transform=`translate(${tx}px, ${ty}px) rotate(${Math.random()*120-60}deg)`; }); setTimeout(()=>{ s.style.opacity='0'; s.style.transform += ' scale(.8)'; }, 550+Math.random()*200); setTimeout(()=>s.remove(), 1000); } }
    document.addEventListener('click', (e)=>{ const t=e.target as HTMLElement; const buy=t.closest('a.btn--primary'); const copy=t.closest('#copy-contract'); if(buy||copy){ shellBurst(e.clientX, e.clientY, buy?12:8); } }, {passive:true});

    // Parallax tilt
    const mascot = document.querySelector('.hero__right .crab') as HTMLElement | null;
    const clouds = document.querySelectorAll('.cloud') as NodeListOf<HTMLElement>;
    const hero = document.querySelector('.hero') as HTMLElement | null;
    if(hero){ hero.addEventListener('mousemove', (e: MouseEvent)=>{ const r=hero.getBoundingClientRect(); const rx=(e.clientX-r.left)/r.width-.5; const ry=(e.clientY-r.top)/r.height-.5; if(mascot){ mascot.style.transform=`translateY(-6px) rotate(${rx*4}deg)`; } clouds.forEach((c,i)=>{ c.style.transform=`translateX(${rx*(i?25:15)}px) translateY(${ry*(i?8:4)}px)`; }); }); hero.addEventListener('mouseleave', ()=>{ if(mascot){ mascot.style.transform=''; } clouds.forEach(c=>{ c.style.transform=''; }); }); }

    // Smooth scroll for anchors with header offset
    const header = document.querySelector('.site-header') as HTMLElement | null;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const headerH = ()=> (header?.offsetHeight || 0) + 12;
    const easeInOutCubic = (t:number)=> t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const animateScrollTo = (targetY:number, duration=650)=>{ const startY = window.scrollY || window.pageYOffset; const delta = targetY-startY; const start=performance.now(); function step(ts:number){ const p=Math.min(1,(ts-start)/duration); const eased=easeInOutCubic(p); window.scrollTo(0, startY + delta*eased); if(p<1) requestAnimationFrame(step);} requestAnimationFrame(step); };
    const onDocClick = (e: MouseEvent)=>{ const a=(e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null; if(!a) return; const href=a.getAttribute('href'); if(!href || href==='#') return; const id=href.slice(1); const target=document.getElementById(id); if(!target) return; e.preventDefault(); const navMenu=document.getElementById('nav-menu'); if(navMenu?.classList.contains('open')){ navMenu.classList.remove('open'); const tgl=document.querySelector('.nav__toggle') as HTMLElement | null; tgl?.setAttribute('aria-expanded','false'); } const y = target.getBoundingClientRect().top + window.scrollY - headerH(); if(prefersReduce.matches){ window.scrollTo({top:y,left:0}); } else { animateScrollTo(y, 700); } history.pushState(null,'',href); };
    document.addEventListener('click', onDocClick, {passive:false});

    return ()=>{
      document.removeEventListener('click', clickRipple as any);
      document.removeEventListener('click', onDocClick as any);
      window.removeEventListener('resize', resize as any);
    };
  }, []);

  return null;
}
