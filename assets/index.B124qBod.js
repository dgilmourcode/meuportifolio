(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}})();var x="/meuportifolio/assets/appsheet-gestao.BOdlTDK2.webp",w="/meuportifolio/assets/dashboard-inteligente.CZW0ITNt.webp",y="/meuportifolio/assets/governanca-dados.AI34U460.webp",E="/meuportifolio/assets/monitoramento-operacional.DCJHAEoP.webp",L="/meuportifolio/assets/otimizacao-logistica.Bf_krx-G.webp",S=Object.fromEntries(Object.entries(Object.assign({"../assets/img-projetos/appsheet-gestao.webp":x,"../assets/img-projetos/dashboard-inteligente.webp":w,"../assets/img-projetos/governanca-dados.webp":y,"../assets/img-projetos/monitoramento-operacional.webp":E,"../assets/img-projetos/otimizacao-logistica.webp":L})).map(([e,t])=>[e.split("/").pop(),t]));function h(e){return S[e]??"../assets/img-projetos/placeholder.webp"}var p=[{title:"Dashboard Operacional",category:"Data & BI",shortDesc:"KPIs em tempo real.",fullDesc:"Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe.",metrics:[{label:"Redução Tempo",value:"70%",icon:"fa-clock"},{label:"Economia",value:"15h",icon:"fa-coins"}],imageFile:"dashboard-inteligente.webp",tags:["Power BI","SQL","ETL"],link:"#contato"},{title:"AppSheet Processos Ágeis",category:"Low-Code",shortDesc:"Sistemas Mobile Otimizados.",fullDesc:"App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets.",metrics:[{label:"Usuários",value:"85+",icon:"fa-users"},{label:"Uptime",value:"99%",icon:"fa-server"}],imageFile:"appsheet-gestao.webp",tags:["AppSheet","Mobile"],link:"https://wa.me/5586994936797"},{title:"Otimização Logística",category:"Processos Ágeis",shortDesc:"Lean & Dados.",fullDesc:"Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga.",metrics:[{label:"Eficiência",value:"+40%",icon:"fa-chart-line"},{label:"Entregas",value:"500+",icon:"fa-truck-fast"}],imageFile:"otimizacao-logistica.webp",tags:["Lean","Logística"],link:"#contato"},{title:"Governança de Dados",category:"Automação",shortDesc:"Python & Pandas.",fullDesc:"Scripts Python para validação e limpeza automática de grandes volumes de dados.",metrics:[{label:"Auto",value:"100%",icon:"fa-robot"},{label:"Emails",value:"30+",icon:"fa-envelope"}],imageFile:"governanca-dados.webp",tags:["Python","Pandas"],link:"#contato"},{title:"Monitoramento Sistemas",category:"Sistemas",shortDesc:"Custos & Performance.",fullDesc:"Painel de monitoramento proativo de hardware e serviços.",metrics:[{label:"Custos",value:"-80%",icon:"fa-money-bill-wave"},{label:"Uptime",value:"99.9%",icon:"fa-heart-pulse"}],imageFile:"monitoramento-operacional.webp",tags:["Infra","Monitoramento"],link:"#contato"}],k={"Data & BI":"fa-chart-line","Low-Code":"fa-code","Processos Ágeis":"fa-rocket",Automação:"fa-robot",Sistemas:"fa-server"},f={passive:!0};function b(e,t){let o=0;return(...a)=>{const i=Date.now();i-o>=t&&(o=i,e(...a))}}function A(){const e=document.getElementById("spotlight");if(!e||window.matchMedia("(max-width: 768px)").matches)return;let t=!1;document.addEventListener("mousemove",o=>{t||(t=!0,requestAnimationFrame(()=>{e.style.left=`${o.clientX}px`,e.style.top=`${o.clientY}px`,t=!1}))},f)}function M(){const e=document.getElementById("scroll-progress");if(!e)return;const t=()=>{const{scrollTop:o,scrollHeight:a,clientHeight:i}=document.documentElement;e.style.width=`${o/(a-i)*100}%`};window.addEventListener("scroll",t,f)}function q(){const e=new IntersectionObserver(t=>t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("visible"),e.unobserve(o.target))}),{threshold:.08,rootMargin:"0px 0px -40px 0px"});document.querySelectorAll(".fade-in-section").forEach((t,o)=>{t.style.transitionDelay=`${o*80}ms`,e.observe(t)})}function j(){const e=document.getElementById("navbar");if(!e)return;let t=0;const o=b(()=>{const a=window.scrollY;e.classList.toggle("scrolled",a>50),e.style.transform=a>t&&a>400?"translateY(-100%)":"translateY(0)",t=a},80);window.addEventListener("scroll",o,f)}function $(){const e=document.querySelectorAll(".nav-link"),t=new Map([...e].map(a=>[a.getAttribute("href")?.slice(1),a])),o=new IntersectionObserver(a=>a.forEach(i=>{if(i.intersectionRatio>.4){e.forEach(c=>c.classList.remove("active","text-white"));const n=t.get(i.target.id);n&&n.classList.add("active","text-white")}}),{threshold:[.4],rootMargin:"-15% 0px -55% 0px"});document.querySelectorAll("section[id]").forEach(a=>o.observe(a))}function D(){const e=document.querySelector("nav")?.offsetHeight??0;document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",o=>{const a=document.querySelector(t.getAttribute("href"));a&&(o.preventDefault(),window.scrollTo({top:a.getBoundingClientRect().top+window.scrollY-e-16,behavior:"smooth"}),g())})})}function I(){const e=document.getElementById("mobile-menu-btn"),t=document.getElementById("mobile-menu-close"),o=document.getElementById("mobile-menu");!e||!o||(e.addEventListener("click",B),t?.addEventListener("click",g),document.querySelectorAll(".mobile-nav-link").forEach(a=>a.addEventListener("click",g)))}function B(){document.getElementById("mobile-menu")?.classList.add("open"),document.body.style.overflow="hidden"}function g(){document.getElementById("mobile-menu")?.classList.remove("open"),document.body.style.overflow=""}function P(){window.matchMedia("(max-width: 768px)").matches||document.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",t=>{const{left:o,top:a,width:i,height:n}=e.getBoundingClientRect(),c=((t.clientY-a)/n-.5)*6,r=((t.clientX-o)/i-.5)*6;e.style.transform=`perspective(900px) rotateX(${c}deg) rotateY(${r}deg) translateY(-4px)`}),e.addEventListener("mouseleave",()=>{e.style.transform=""})})}function C(){window.matchMedia("(max-width: 768px)").matches||document.querySelectorAll(".magnetic-btn").forEach(e=>{e.addEventListener("mousemove",t=>{const{left:o,top:a,width:i,height:n}=e.getBoundingClientRect();e.style.transform=`translate(${(t.clientX-o-i/2)*.18}px, ${(t.clientY-a-n/2)*.18}px)`}),e.addEventListener("mouseleave",()=>{e.style.transform=""})})}function T(){const e=document.getElementById("year");e&&(e.textContent=new Date().getFullYear())}function O(){const e=document.getElementById("typewriter-text");if(!e)return;const t="Desenvolvedor Web & Analista de Sistemas e Dados";let o=0;const a=95;let i=0;function n(c){c-i>=a&&(e.textContent+=t[o++],i=c),o<48&&requestAnimationFrame(n)}setTimeout(()=>requestAnimationFrame(n),900)}function N(){const e=document.getElementById("projects-section-container"),t=document.getElementById("projects-carousel"),o=document.getElementById("carousel-dots");if(!t||!o||!e)return;const a=["Todos",...new Set(p.map(r=>r.category))],i=document.createElement("div");i.className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide w-full justify-center px-4 md:px-8",i.innerHTML=a.map(r=>`
    <button
      class="filter-btn whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all duration-300 shrink-0
             ${r==="Todos"?"bg-accent text-white border-accent shadow-lg shadow-accent/20":"bg-white/5 text-gray-400 border-white/10 hover:border-accent/50 hover:text-white"}"
      data-category="${r}">${r}
    </button>`).join(""),e.insertBefore(i,t),t.className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 scrollbar-hide w-full px-6 md:px-12 items-start",t.innerHTML=p.map((r,l)=>`
    <div class="project-card-item snap-center shrink-0 w-[280px] flex flex-col group cursor-pointer
                bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden
                hover:border-accent/40 transition-all duration-400 ease-out hover:-translate-y-2
                hover:shadow-2xl hover:shadow-black/40"
         data-category="${r.category}"
         data-index="${l}">

      <div class="relative p-5 pb-3">
        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <i class="fa-solid ${k[r.category]??"fa-folder"} text-indigo-400 text-sm"></i>
          <i class="fa-solid fa-arrow-up-right-from-square text-gray-400 text-xs group-hover:text-white transition-colors"></i>
        </div>
        <div class="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent/30 group-hover:border-accent transition-colors duration-300 shadow-lg">
          <img src="${h(r.imageFile)}" alt="${r.title}" loading="lazy" decoding="async"
               class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
               onerror="this.style.opacity='0'">
        </div>
        <div class="mt-3">
          <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">${r.category}</span>
          <h3 class="text-lg font-bold text-white mt-1 leading-tight group-hover:text-accent transition-colors">${r.title}</h3>
        </div>
      </div>

      <div class="px-5 pb-5 flex flex-col flex-1">
        <p class="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">${r.shortDesc}</p>
        <div class="grid grid-cols-2 gap-2 mb-4">
          ${r.metrics.map(d=>`
            <div class="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <i class="fa-solid ${d.icon} text-accent text-xs"></i>
              <div>
                <div class="text-sm font-bold text-white leading-none">${d.value}</div>
                <div class="text-[8px] text-gray-400 uppercase tracking-wide">${d.label.split(" ")[0]}</div>
              </div>
            </div>`).join("")}
        </div>
        <div class="flex flex-wrap gap-2 mt-auto">
          ${r.tags.map(d=>`
            <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-gray-300
                         hover:border-accent hover:text-white hover:bg-accent/20 transition-all duration-200">${d}</span>`).join("")}
        </div>
      </div>
    </div>`).join("")+'<div class="snap-center shrink-0 w-px"></div>',o.className="flex justify-center gap-2 mt-6 w-full",o.innerHTML=p.map((r,l)=>`<button class="w-2 h-2 rounded-full bg-white/20 transition-all duration-300" data-index="${l}"></button>`).join("");const n=[...o.querySelectorAll("button")];function c(){const r=Math.round(t.scrollLeft/288);n.forEach((l,d)=>{l.className=d===r?"h-2 rounded-full bg-accent transition-all duration-300 w-6":"w-2 h-2 rounded-full bg-white/20 transition-all duration-300"})}t.addEventListener("scroll",b(c,60),f),c(),o.addEventListener("click",r=>{const l=r.target.dataset.index;l!==void 0&&t.scrollTo({left:+l*288,behavior:"smooth"})}),i.addEventListener("click",r=>{const l=r.target.closest(".filter-btn");if(!l)return;i.querySelectorAll(".filter-btn").forEach(m=>{m.className=m.className.replace("bg-accent text-white border-accent shadow-lg shadow-accent/20","").replace("bg-white/5 text-gray-400 border-white/10","")+" bg-white/5 text-gray-400 border-white/10"}),l.className=l.className.replace("bg-white/5 text-gray-400 border-white/10","")+" bg-accent text-white border-accent shadow-lg shadow-accent/20";const d=l.dataset.category;t.querySelectorAll(".project-card-item").forEach(m=>{m.style.display=d==="Todos"||m.dataset.category===d?"flex":"none"}),c()}),t.addEventListener("click",r=>{const l=r.target.closest(".project-card-item");l&&v(+l.dataset.index)})}var s=null;function z(){const e=document.createElement("div");return e.id="project-modal",e.className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300",e.innerHTML=`
    <div id="modal-box"
         class="relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl
                border border-white/10 flex flex-col max-h-[90vh] transform scale-95 transition-transform duration-300">
      <button id="modal-close"
              class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white
                     flex items-center justify-center hover:bg-white hover:text-black transition-colors
                     backdrop-blur-md border border-white/10">
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>
      <div id="modal-img-wrap" class="h-56 w-full bg-slate-800 relative shrink-0">
        <img id="modal-img" class="w-full h-full object-cover" loading="lazy" alt="">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
      <div class="p-6 overflow-y-auto flex-1">
        <span id="modal-cat"  class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block"></span>
        <h2  id="modal-title" class="text-2xl font-bold text-white mb-4 leading-tight"></h2>
        <p   id="modal-desc"  class="text-gray-300 text-sm leading-relaxed mb-6"></p>
        <div id="modal-metrics" class="grid grid-cols-2 gap-3 mb-6"></div>
        <div id="modal-tags"    class="flex flex-wrap gap-2 mb-6"></div>
        <a   id="modal-cta"
             class="block w-full py-3 bg-accent text-white rounded-xl font-bold text-sm text-center
                    hover:bg-accent-light transition-colors shadow-lg shadow-accent/20">
          Discutir Projeto <i class="fa-solid fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>`,document.body.appendChild(e),e.addEventListener("click",t=>{t.target===e&&u()}),e.querySelector("#modal-close").addEventListener("click",u),document.addEventListener("keydown",t=>{t.key==="Escape"&&u()}),e}function v(e){s||(s=z());const t=p[e];s.querySelector("#modal-img").src=h(t.imageFile),s.querySelector("#modal-img").alt=t.title,s.querySelector("#modal-cat").textContent=t.category,s.querySelector("#modal-title").textContent=t.title,s.querySelector("#modal-desc").textContent=t.fullDesc,s.querySelector("#modal-metrics").innerHTML=t.metrics.map(a=>`
    <div class="p-3 rounded-xl bg-white/5 border border-white/5">
      <div class="text-lg font-bold text-accent">${a.value}</div>
      <div class="text-[10px] text-gray-400 uppercase">${a.label}</div>
    </div>`).join(""),s.querySelector("#modal-tags").innerHTML=t.tags.map(a=>`<span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium text-gray-200">${a}</span>`).join("");const o=s.querySelector("#modal-cta");o.href=t.link,o.onclick=u,document.body.style.overflow="hidden",requestAnimationFrame(()=>{s.classList.remove("pointer-events-none"),s.style.opacity="1",s.querySelector("#modal-box").classList.replace("scale-95","scale-100")})}function u(){s&&(s.style.opacity="0",s.querySelector("#modal-box").classList.replace("scale-100","scale-95"),s.classList.add("pointer-events-none"),document.body.style.overflow="")}window.openCompactModal=v;window.closeCompactModal=u;document.addEventListener("DOMContentLoaded",()=>{A(),M(),q(),j(),$(),D(),I(),P(),C(),T(),O(),N(),console.log("✅ Portfolio ready")});
