(()=>{
 const hash=()=>decodeURIComponent(location.hash.slice(1));
 const isHome=/\/(?:index\.html)?$/.test(location.pathname);
 if(isHome&&location.hash){const h=hash();const m=h.match(/(?:day|sight-|food-)([1-5])/);if(m){location.replace('day'+m[1]+'.html#'+encodeURIComponent(h));return;}}
 const panels=[...document.querySelectorAll('.tab-panel')];
 const tabs=[...document.querySelectorAll('[data-panel]')];
 const bar=document.querySelector('.section-nav');
 if(bar){bar.setAttribute('role','tablist');tabs.forEach(t=>{t.setAttribute('role','tab');t.setAttribute('aria-controls',t.dataset.panel);});panels.forEach(p=>p.setAttribute('role','tabpanel'));}
 function select(id){panels.forEach(p=>p.hidden=p.id!==id);tabs.forEach(t=>{const on=t.dataset.panel===id;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;});}
 function reveal(scroll){if(!panels.length)return;const target=document.getElementById(hash());const panel=target?.closest('.tab-panel')||panels[0];select(panel.id);if(target){let node=target;while(node){if(node.tagName==='DETAILS')node.open=true;node=node.parentElement;}if(scroll)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}
 tabs.forEach((t,i)=>{t.addEventListener('click',ev=>{ev.preventDefault();history.replaceState(null,'',t.hash);select(t.dataset.panel);});t.addEventListener('keydown',ev=>{let n;if(ev.key==='ArrowRight')n=(i+1)%tabs.length;if(ev.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(ev.key==='Home')n=0;if(ev.key==='End')n=tabs.length-1;if(n!==undefined){ev.preventDefault();tabs[n].click();tabs[n].focus();}});});
 document.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.dataset.panel)return;a.addEventListener('click',()=>setTimeout(()=>reveal(true),0));});
 document.querySelectorAll('[data-guide]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.guide).querySelectorAll('.sight').forEach(d=>d.open=b.dataset.open==='yes')));
 window.addEventListener('hashchange',()=>reveal(true));reveal(Boolean(location.hash));
 let printState=[];window.addEventListener('beforeprint',()=>{printState=[...document.querySelectorAll('.sight')].map(d=>[d,d.open]);printState.forEach(([d])=>d.open=true);});window.addEventListener('afterprint',()=>printState.forEach(([d,open])=>d.open=open));
})();
