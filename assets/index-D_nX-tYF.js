(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}})();var g={scrollThrottle:100,animationThreshold:.1,navbarOffset:50,mobileMenuBreakpoint:768},h={passive:!0};function L(e,t){let o;return function(...s){o||(e.apply(this,s),o=!0,setTimeout(()=>o=!1,t))}}function E(){const e=document.getElementById("spotlight");if(!e)return;let t=null;document.addEventListener("mousemove",o=>{t||(t=requestAnimationFrame(()=>{e.style.left=`${o.clientX}px`,e.style.top=`${o.clientY}px`,t=null}))},h)}function S(){const e=document.getElementById("scroll-progress");e&&window.addEventListener("scroll",()=>{const t=document.documentElement.scrollTop/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;e.style.width=`${t}%`},h)}function A(){document.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",t=>{const o=e.getBoundingClientRect(),s=t.clientX-o.left,a=t.clientY-o.top,i=o.width/2,l=(a-o.height/2)/20,d=(i-s)/20;e.style.transform=`perspective(1000px) rotateX(${l}deg) rotateY(${d}deg) translateY(-4px)`}),e.addEventListener("mouseleave",()=>{e.style.transform="perspective(1000px) rotateX(0) rotateY(0) translateY(0)"})})}function k(){document.querySelectorAll(".magnetic-btn").forEach(e=>{e.addEventListener("mousemove",t=>{const o=e.getBoundingClientRect(),s=t.clientX-o.left-o.width/2,a=t.clientY-o.top-o.height/2;e.style.transform=`translate(${s*.2}px, ${a*.2}px)`}),e.addEventListener("mouseleave",()=>{e.style.transform="translate(0, 0)"})})}function M(){const e={threshold:g.animationThreshold,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(o=>{o.forEach(s=>{s.isIntersecting&&(s.target.classList.add("visible"),t.unobserve(s.target))})},e);document.querySelectorAll(".fade-in-section").forEach((o,s)=>{o.style.setProperty("--delay",`${s*100}ms`),t.observe(o)})}function I(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const o=this.getAttribute("href");if(o==="#")return;const s=document.querySelector(o);if(s){const a=document.querySelector("nav"),i=a?a.offsetHeight:0,l=s.getBoundingClientRect().top+window.pageYOffset-i-20;window.scrollTo({top:l,behavior:"smooth"}),f()}})})}function $(){const e=document.getElementById("mobile-menu-btn"),t=document.getElementById("mobile-menu-close"),o=document.getElementById("mobile-menu"),s=document.querySelectorAll(".mobile-nav-link");!e||!o||(e.addEventListener("click",D),t&&t.addEventListener("click",f),s.forEach(a=>a.addEventListener("click",f)))}function D(){const e=document.getElementById("mobile-menu");e&&(e.classList.add("open"),document.body.style.overflow="hidden")}function f(){const e=document.getElementById("mobile-menu");e&&(e.classList.remove("open"),document.body.style.overflow="")}function P(){const e=document.querySelectorAll("section[id]"),t=document.querySelectorAll(".nav-link"),o=new IntersectionObserver(s=>{s.forEach(a=>{if(a.intersectionRatio>.5){const i=a.target.getAttribute("id");t.forEach(l=>{const d=l.getAttribute("href")===`#${i}`;l.classList.toggle("active",d),l.classList.toggle("text-white",d),l.classList.toggle("text-text-muted",!d)})}})},{threshold:[0,.25,.5,.75,1],rootMargin:"-20% 0px -60% 0px"});e.forEach(s=>o.observe(s))}function T(){const e=document.getElementById("navbar");if(!e)return;let t=0;const o=L(()=>{const s=window.pageYOffset;requestAnimationFrame(()=>{s>g.navbarOffset?e.classList.add("scrolled"):e.classList.remove("scrolled"),s>t&&s>500?e.style.transform="translateY(-100%)":e.style.transform="translateY(0)"}),t=s},g.scrollThrottle);window.addEventListener("scroll",o,h)}function C(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".project-card");e.forEach(o=>{o.addEventListener("click",()=>{B(o);const s=o.getAttribute("data-filter");t.forEach(a=>{if(s==="all")y(a);else{const i=a.getAttribute("data-category");i&&i.includes(s)?y(a):O(a)}})})})}function B(e){document.querySelectorAll(".filter-btn").forEach(t=>{t.classList.remove("active","bg-accent","text-white","shadow-lg"),t.classList.add("bg-white/5","border","border-white/10","text-text-muted")}),e.classList.remove("bg-white/5","border","border-white/10","text-text-muted"),e.classList.add("active","bg-accent","text-white","shadow-lg")}function y(e){e.classList.remove("hidden"),requestAnimationFrame(()=>{e.style.opacity="1",e.style.transform="translateY(0)"})}function O(e){e.style.opacity="0",e.style.transform="translateY(20px)",setTimeout(()=>{e.classList.add("hidden")},300)}function j(){const e=document.getElementById("year");e&&(e.textContent=new Date().getFullYear())}document.addEventListener("DOMContentLoaded",function(){E(),S(),I(),$(),P(),T(),M(),A(),k(),C(),j(),q(),console.log("✅ Portfolio initialized successfully")});function q(){const e=document.getElementById("projects-section-container"),t=document.getElementById("projects-carousel"),o=document.getElementById("carousel-dots");if(!t||!o||!e)return;t.innerHTML="",o.innerHTML="";const s=[{title:"Dashboard Operacional",category:"Data & BI",shortDesc:"KPIs em tempo real.",fullDesc:"Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe.",metrics:[{label:"Redução Tempo",value:"70%",icon:"fa-clock"},{label:"Economia",value:"15h",icon:"fa-coins"}],image:"assets/img-projetos/dashboard-inteligente.webp",tags:["Power BI","SQL","ETL"],link:"#contato"},{title:"AppSheet Processos Ágeis",category:"Low-Code",shortDesc:"Sistemas Mobile Otimizados.",fullDesc:"App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real.",metrics:[{label:"Usuários",value:"85+",icon:"fa-users"},{label:"Uptime",value:"99%",icon:"fa-server"}],image:"assets/img-projetos/appsheet-gestao.webp",tags:["AppSheet","Mobile"],link:"https://wa.me/5586994936797"},{title:"Otimização Logística",category:"Processos",shortDesc:"Lean & Dados.",fullDesc:"Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%.",metrics:[{label:"Eficiência",value:"+40%",icon:"fa-chart-line"},{label:"Entregas",value:"500+",icon:"fa-truck-fast"}],image:"assets/img-projetos/otimizacao-logistica.webp",tags:["Lean","Logística"],link:"#contato"},{title:"Governança de Dados",category:"Automação",shortDesc:"Python & Pandas.",fullDesc:"Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail.",metrics:[{label:"Auto",value:"100%",icon:"fa-robot"},{label:"Emails",value:"30+",icon:"fa-envelope"}],image:"assets/img-projetos/governanca-dados.webp",tags:["Python","Pandas"],link:"#contato"},{title:"Monitoramento Sistemas",category:"Sistemas",shortDesc:"Custos & Performance.",fullDesc:"Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva.",metrics:[{label:"Custos",value:"-80%",icon:"fa-money-bill-wave"},{label:"Uptime",value:"99.9%",icon:"fa-heart-pulse"}],image:"assets/img-projetos/monitoramento-operacional.webp",tags:["Infra","Monitoramento"],link:"#contato"}],a=["Todos",...new Set(s.map(n=>n.category))],i=document.createElement("div");i.className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide w-full",i.style.scrollbarWidth="none",i.style.msOverflowStyle="none",i.innerHTML=a.map(n=>`
        <button class="filter-btn whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all duration-300 shrink-0 ${n==="Todos"?"bg-accent text-white border-accent shadow-lg shadow-accent/20":"bg-white/5 text-gray-400 border-white/10 hover:border-accent/50 hover:text-white"}" data-category="${n}">
            ${n}
        </button>
    `).join(""),e.insertBefore(i,t);const l=i.querySelectorAll(".filter-btn");l.forEach(n=>{n.addEventListener("click",()=>{l.forEach(r=>{r.classList.remove("bg-accent","text-white","border-accent","shadow-lg","shadow-accent/20"),r.classList.add("bg-white/5","text-gray-400","border-white/10")}),n.classList.remove("bg-white/5","text-gray-400","border-white/10"),n.classList.add("bg-accent","text-white","border-accent","shadow-lg","shadow-accent/20");const c=n.dataset.category;t.querySelectorAll(".project-card-item").forEach(r=>{c==="Todos"||r.dataset.category===c?r.style.display="flex":r.style.display="none"}),u()})}),o.className="flex justify-center gap-2 mt-6 w-full",o.innerHTML=s.map((n,c)=>`
        <button class="w-2 h-2 rounded-full bg-white/20 transition-all duration-300 hover:bg-accent" data-index="${c}"></button>
    `).join("");const d=o.querySelectorAll("button");function u(){const n=t.scrollLeft,c=272,r=t.clientWidth/2-260/2,w=Math.round((n+r)/c);d.forEach((m,v)=>{const p=t.children[v],x=p&&p.style.display!=="none"&&!p.classList.contains("spacer-element");v===w&&x?(m.classList.remove("bg-white/20","w-2","h-2"),m.classList.add("bg-accent","w-6","h-2","rounded-full")):(m.classList.add("bg-white/20","w-2","h-2","rounded-full"),m.classList.remove("bg-accent","w-6","h-2"))})}t.className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-8 scrollbar-hide w-full items-start";let b=s.map((n,c)=>`
        <div class="project-card-item snap-center shrink-0 w-[260px] flex flex-col group cursor-pointer bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40" 
            data-category="${n.category}"
            onclick="openCompactModal(${c})">
            
            <!-- IMAGEM OTIMIZADA -->
            <div class="relative w-full h-48 overflow-hidden bg-slate-900">
                <img src="${n.image}" alt="${n.title}" 
                    loading="lazy" 
                    decoding="async"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    onerror="this.style.opacity='0'">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-lg">
                    ${n.category}
                </span>
            </div>

            <!-- CONTEÚDO -->
            <div class="p-4 flex flex-col flex-1">
                <h3 class="text-lg font-bold text-white mb-1 leading-tight group-hover:text-accent transition-colors">${n.title}</h3>
                <p class="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">${n.shortDesc}</p>
                
                <!-- Métricas -->
                <div class="grid grid-cols-2 gap-2 mb-4">
                    ${n.metrics.map(r=>`
                        <div class="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <i class="fa-solid ${r.icon} text-accent text-xs"></i>
                            <div>
                                <div class="text-sm font-bold text-white leading-none">${r.value}</div>
                                <div class="text-[9px] text-gray-400 uppercase tracking-wide">${r.label.split(" ")[0]}</div>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${n.tags.map(r=>`
                        <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-gray-300 transition-all duration-200 hover:border-accent hover:text-white hover:bg-accent/20">
                            ${r}
                        </span>
                    `).join("")}
                </div>
            </div>
        </div>
    `).join("");b+='<div class="snap-center shrink-0 w-[1px] spacer-element"></div>',t.innerHTML=b,t.addEventListener("scroll",u),d.forEach(n=>{n.addEventListener("click",c=>{const r=parseInt(c.target.dataset.index)*272-t.clientWidth/2+130;t.scrollTo({left:Math.max(0,r),behavior:"smooth"})})}),u()}window.openCompactModal=function(e){const t=[{title:"Dashboard Operacional",category:"Data & BI",fullDesc:"Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe. Implementação de KPIs de eficiência operacional em tempo real.",metrics:[{label:"Redução Tempo",value:"70%"},{label:"Economia",value:"15h"}],image:"assets/img-projetos/dashboard-inteligente.webp",tags:["Power BI","SQL","ETL"],link:"#contato"},{title:"AppSheet Gestão",category:"Low-Code",fullDesc:"App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real. Redução de erros de digitação em 90%.",metrics:[{label:"Usuários",value:"85+"},{label:"Uptime",value:"99%"}],image:"assets/img-projetos/appsheet-gestao.webp",tags:["AppSheet","Mobile"],link:"https://wa.me/5586994936797"},{title:"Otimização Logística",category:"Processos",fullDesc:"Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%. Integração com sistemas de rastreamento.",metrics:[{label:"Eficiência",value:"+40%"},{label:"Entregas",value:"500+"}],image:"assets/img-projetos/otimizacao-logistica.webp",tags:["Lean","Logística"],link:"#contato"},{title:"Governança de Dados",category:"Automação",fullDesc:"Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail. Padronização de nomenclatura e formatos.",metrics:[{label:"Auto",value:"100%"},{label:"Emails",value:"30+"}],image:"assets/img-projetos/governanca-dados.webp",tags:["Python","Pandas"],link:"#contato"},{title:"Monitoramento Sistemas",category:"Sistemas",fullDesc:"Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva. Alertas automáticos via Slack/E-mail.",metrics:[{label:"Custos",value:"-80%"},{label:"Uptime",value:"99.9%"}],image:"assets/img-projetos/monitoramento-operacional.webp",tags:["Infra","Monitoramento"],link:"#contato"}][e],o=document.createElement("div");o.className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 transition-opacity duration-300",o.innerHTML=`
        <div class="relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl transform scale-95 transition-transform duration-300 border border-white/10 flex flex-col max-h-[90vh]" id="modal-content">
            
            <button onclick="closeCompactModal()" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md border border-white/10">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>

            <div class="h-56 w-full bg-slate-800 relative shrink-0">
                 <img src="${t.image}" class="w-full h-full object-cover" loading="lazy">
                 <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
           
            <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
                <span class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">${t.category}</span>
                <h2 class="text-2xl font-bold text-white mb-4 leading-tight">${t.title}</h2>
               
                <p class="text-gray-300 text-sm leading-relaxed mb-6">
                   ${t.fullDesc}
                </p>
               
                <div class="grid grid-cols-2 gap-3 mb-6">
                   ${t.metrics.map(a=>`
                        <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div class="text-lg font-bold text-accent">${a.value}</div>
                            <div class="text-[10px] text-gray-400 uppercase">${a.label}</div>
                        </div>
                   `).join("")}
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                   ${t.tags.map(a=>`
                        <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium text-gray-200">
                           ${a}
                        </span>
                   `).join("")}
                </div>

                <a href="${t.link}" onclick="closeCompactModal()" class="block w-full py-3 bg-accent text-white rounded-xl font-bold text-sm text-center hover:bg-accent-light transition-colors shadow-lg shadow-accent/20">
                   Discutir Projeto <i class="fa-solid fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    `,document.body.appendChild(o),document.body.style.overflow="hidden",requestAnimationFrame(()=>{o.style.opacity="1";const a=document.getElementById("modal-content");a&&(a.classList.remove("scale-95"),a.classList.add("scale-100"))}),o.addEventListener("click",a=>{a.target===o&&closeCompactModal()});const s=a=>{a.key==="Escape"&&(closeCompactModal(),document.removeEventListener("keydown",s))};document.addEventListener("keydown",s)};window.closeCompactModal=function(){const e=document.querySelector(".fixed.inset-0.z-\\[100\\]");if(e){e.style.opacity="0";const t=document.getElementById("modal-content");t&&(t.classList.remove("scale-100"),t.classList.add("scale-95")),setTimeout(()=>{e.remove(),document.body.style.overflow=""},300)}};function z(){const e=document.getElementById("typewriter-text");if(!e)return;const t="Desenvolvedor Web & Analista de Dados";let o=0;const s=100;function a(){o<37&&(e.textContent+=t.charAt(o),o++,setTimeout(a,s))}setTimeout(a,1e3)}document.addEventListener("DOMContentLoaded",()=>{z()});
