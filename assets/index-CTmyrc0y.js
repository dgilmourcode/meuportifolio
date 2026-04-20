(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}})();var u={scrollThrottle:100,animationThreshold:.1,navbarOffset:50,mobileMenuBreakpoint:768},g={passive:!0};function y(e,t){let o;return function(...s){o||(e.apply(this,s),o=!0,setTimeout(()=>o=!1,t))}}function x(){const e=document.getElementById("spotlight");if(!e)return;let t=null;document.addEventListener("mousemove",o=>{t||(t=requestAnimationFrame(()=>{e.style.left=`${o.clientX}px`,e.style.top=`${o.clientY}px`,t=null}))},g)}function w(){const e=document.getElementById("scroll-progress");e&&window.addEventListener("scroll",()=>{const t=document.documentElement.scrollTop/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;e.style.width=`${t}%`},g)}function L(){document.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",t=>{const o=e.getBoundingClientRect(),s=t.clientX-o.left,a=t.clientY-o.top,i=o.width/2,r=(a-o.height/2)/15,d=(i-s)/15;e.style.transform=`perspective(1000px) rotateX(${r}deg) rotateY(${d}deg) translateY(-4px)`}),e.addEventListener("mouseleave",()=>{e.style.transform="perspective(1000px) rotateX(0) rotateY(0) translateY(0)"})})}function E(){document.querySelectorAll(".magnetic-btn").forEach(e=>{e.addEventListener("mousemove",t=>{const o=e.getBoundingClientRect(),s=t.clientX-o.left-o.width/2,a=t.clientY-o.top-o.height/2;e.style.transform=`translate(${s*.3}px, ${a*.3}px)`}),e.addEventListener("mouseleave",()=>{e.style.transform="translate(0, 0)"})})}function S(){const e={threshold:u.animationThreshold,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(o=>{o.forEach(s=>{s.isIntersecting&&(s.target.classList.add("visible"),t.unobserve(s.target))})},e);document.querySelectorAll(".fade-in-section").forEach((o,s)=>{o.style.setProperty("--delay",`${s*100}ms`),t.observe(o)})}function A(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const o=this.getAttribute("href");if(o==="#")return;const s=document.querySelector(o);if(s){const a=document.querySelector("nav"),i=a?a.offsetHeight:0,r=s.getBoundingClientRect().top+window.pageYOffset-i-20;window.scrollTo({top:r,behavior:"smooth"}),p()}})})}function M(){const e=document.getElementById("mobile-menu-btn"),t=document.getElementById("mobile-menu-close"),o=document.getElementById("mobile-menu"),s=document.querySelectorAll(".mobile-nav-link");!e||!o||(e.addEventListener("click",k),t&&t.addEventListener("click",p),s.forEach(a=>{a.addEventListener("click",p)}))}function k(){const e=document.getElementById("mobile-menu");e&&(e.classList.add("open"),document.body.style.overflow="hidden")}function p(){const e=document.getElementById("mobile-menu");e&&(e.classList.remove("open"),document.body.style.overflow="")}function C(){const e=document.querySelectorAll("section[id]"),t=document.querySelectorAll(".nav-link"),o=new IntersectionObserver(s=>{s.forEach(a=>{if(a.intersectionRatio>.5){const i=a.target.getAttribute("id");t.forEach(r=>{const d=r.getAttribute("href")===`#${i}`;r.classList.toggle("active",d),r.classList.toggle("text-white",d),r.classList.toggle("text-text-muted",!d)})}})},{threshold:[0,.25,.5,.75,1],rootMargin:"-20% 0px -60% 0px"});e.forEach(s=>o.observe(s))}function I(){const e=document.getElementById("navbar");if(!e)return;let t=0;const o=y(()=>{const s=window.pageYOffset;requestAnimationFrame(()=>{s>u.navbarOffset?e.classList.add("scrolled"):e.classList.remove("scrolled"),s>t&&s>500?e.style.transform="translateY(-100%)":e.style.transform="translateY(0)"}),t=s},u.scrollThrottle);window.addEventListener("scroll",o,g)}function T(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".project-card");e.forEach(o=>{o.addEventListener("click",()=>{j(o);const s=o.getAttribute("data-filter");t.forEach(a=>{if(s==="all")b(a);else{const i=a.getAttribute("data-category");i&&i.includes(s)?b(a):P(a)}})})})}function j(e){document.querySelectorAll(".filter-btn").forEach(t=>{t.classList.remove("active","bg-accent","text-white","shadow-lg"),t.classList.add("bg-white/5","border","border-white/10","text-text-muted")}),e.classList.remove("bg-white/5","border","border-white/10","text-text-muted"),e.classList.add("active","bg-accent","text-white","shadow-lg")}function b(e){e.classList.remove("hidden"),requestAnimationFrame(()=>{e.style.opacity="1",e.style.transform="translateY(0)"})}function P(e){e.style.opacity="0",e.style.transform="translateY(20px)",setTimeout(()=>{e.classList.add("hidden")},300)}function $(){const e=document.getElementById("year");e&&(e.textContent=new Date().getFullYear())}document.addEventListener("DOMContentLoaded",function(){x(),w(),A(),M(),C(),I(),S(),L(),E(),T(),$(),console.log("✅ Portfolio initialized successfully")});function D(){const e=document.getElementById("projects-section-container"),t=document.getElementById("projects-carousel"),o=document.getElementById("carousel-dots");if(!t||!o||!e)return;t.innerHTML="",o.innerHTML="";const s=[{title:"Dashboard Operacional",category:"Data & BI",shortDesc:"KPIs em tempo real.",fullDesc:"Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe.",metrics:[{label:"Redução Tempo",value:"70%",icon:"fa-clock"},{label:"Economia",value:"15h",icon:"fa-coins"}],image:"public/assets/img-projetos/dashboard-inteligente.jpg",tags:["Power BI","SQL","ETL"],link:"#contato"},{title:"AppSheet Processos Ágeis",category:"Low-Code",shortDesc:"Sistemas Mobile Otimizados.",fullDesc:"App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real.",metrics:[{label:"Usuários",value:"85+",icon:"fa-users"},{label:"Uptime",value:"99%",icon:"fa-server"}],image:"public/assets/img-projetos/appsheet-gestao.jpg",tags:["AppSheet","Mobile"],link:"https://wa.me/5586994936797"},{title:"Otimização Logística",category:"Processos",shortDesc:"Lean & Dados.",fullDesc:"Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%.",metrics:[{label:"Eficiência",value:"+40%",icon:"fa-chart-line"},{label:"Entregas",value:"500+",icon:"fa-truck-fast"}],image:"public/assets/img-projetos/otimizacao-logistica.jpg",tags:["Lean","Logística"],link:"#contato"},{title:"Governança de Dados",category:"Automação",shortDesc:"Python & Pandas.",fullDesc:"Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail.",metrics:[{label:"Auto",value:"100%",icon:"fa-robot"},{label:"Emails",value:"30+",icon:"fa-envelope"}],image:"public/assets/img-projetos/governanca-dados.jpg",tags:["Python","Pandas"],link:"#contato"},{title:"Monitoramento Sistemas",category:"Sistemas",shortDesc:"Custos & Performance.",fullDesc:"Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva.",metrics:[{label:"Custos",value:"-80%",icon:"fa-money-bill-wave"},{label:"Uptime",value:"99.9%",icon:"fa-heart-pulse"}],image:"public/assets/img-projetos/monitoramento-operacional.jpg",tags:["Infra","Monitoramento"],link:"#contato"}],a=["Todos",...new Set(s.map(n=>n.category))],i=document.createElement("div");i.className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide w-full px-1",i.style.scrollbarWidth="none",i.style.msOverflowStyle="none",i.innerHTML=a.map(n=>`
        <button class="filter-btn whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium border transition-all duration-300 shrink-0 ${n==="Todos"?"bg-accent text-white border-accent shadow-lg shadow-accent/20":"bg-white/5 text-gray-400 border-white/10 hover:border-accent/50 hover:text-white"}" data-category="${n}">
            ${n}
        </button>
    `).join(""),e.insertBefore(i,t);const r=i.querySelectorAll(".filter-btn");r.forEach(n=>{n.addEventListener("click",()=>{r.forEach(l=>{l.classList.remove("bg-accent","text-white","border-accent","shadow-lg","shadow-accent/20"),l.classList.add("bg-white/5","text-gray-400","border-white/10")}),n.classList.remove("bg-white/5","text-gray-400","border-white/10"),n.classList.add("bg-accent","text-white","border-accent","shadow-lg","shadow-accent/20");const c=n.dataset.category;t.querySelectorAll(".project-card-item").forEach(l=>{c==="Todos"||l.dataset.category===c?l.style.display="flex":l.style.display="none"}),m()})}),o.className="flex justify-center gap-1.5 mt-4 w-full",o.innerHTML=s.map((n,c)=>`
        <button class="w-1 h-1 rounded-full bg-white/20 transition-all duration-300 hover:bg-accent" data-index="${c}"></button>
    `).join("");const d=o.querySelectorAll("button");function m(){const n=t.scrollLeft,c=Math.round(n/272);d.forEach((l,f)=>{const h=t.children[f],v=h&&h.style.display!=="none";f===c&&v?(l.classList.remove("bg-white/20","w-1","h-1"),l.classList.add("bg-accent","w-3","h-1")):(l.classList.add("bg-white/20","w-1","h-1","rounded-full"),l.classList.remove("bg-accent","w-3","h-1"))})}t.className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 scrollbar-hide w-full px-1",t.innerHTML=s.map((n,c)=>`
        <div class="project-card-item snap-center shrink-0 w-[260px] flex flex-col group cursor-pointer bg-slate-800/40 border border-white/5 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20" 
             data-category="${n.category}"
             onclick="openCompactModal(${c})">
            
            <!-- IMAGEM TOPO (Estilo Capa Vertical) -->
            <div class="relative w-full h-48 overflow-hidden bg-slate-900">
                <img src="${n.image}" alt="${n.title}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                     onerror="this.style.opacity='0'">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-80"></div>
                
                <!-- Categoria Minimalista -->
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-wider border border-white/10">
                    ${n.category}
                </span>
            </div>

            <!-- CONTEÚDO COMPACTO -->
            <div class="p-3 flex flex-col flex-1">
                <h3 class="text-base font-bold text-white mb-1 leading-tight group-hover:text-accent transition-colors">${n.title}</h3>
                <p class="text-gray-400 text-[10px] mb-3 line-clamp-2 leading-relaxed">${n.shortDesc}</p>
                
                <!-- Métricas Mini -->
                <div class="grid grid-cols-2 gap-2 mb-3">
                    ${n.metrics.map(l=>`
                        <div class="flex items-center gap-1.5 p-1.5 rounded bg-white/5 border border-white/5">
                            <i class="fa-solid ${l.icon} text-accent text-[10px]"></i>
                            <div>
                                <div class="text-xs font-bold text-white leading-none">${l.value}</div>
                                <div class="text-[8px] text-gray-300 mt-1 uppercase">${l.label.split(" ")[0]}</div>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <!-- Tags Suaves (Hover Rápido) -->
                <div class="flex flex-wrap gap-2">
                    ${n.tags.map(l=>`
                        <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-gray-300 transition-all duration-200 hover:border-accent hover:text-white hover:bg-accent">
                            ${l}
                        </span>
                    `).join("")}
                </div>
            </div>
        </div>
    `).join(""),t.addEventListener("scroll",m),d.forEach(n=>{n.addEventListener("click",c=>{const l=parseInt(c.target.dataset.index);t.scrollTo({left:l*272,behavior:"smooth"})})}),m()}window.openCompactModal=function(e){const t=[{title:"Dashboard Operacional",category:"Data & BI",fullDesc:"Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe. Implementação de KPIs de eficiência operacional em tempo real.",metrics:[{label:"Redução Tempo",value:"70%"},{label:"Economia",value:"15h"}],image:"public/assets/img-projetos/dashboard-inteligente.jpg",tags:["Power BI","SQL","ETL"],link:"#contato"},{title:"AppSheet Gestão",category:"Low-Code",fullDesc:"App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real. Redução de erros de digitação em 90%.",metrics:[{label:"Usuários",value:"85+"},{label:"Uptime",value:"99%"}],image:"public/assets/img-projetos/appsheet-gestao.jpg",tags:["AppSheet","Mobile"],link:"https://wa.me/5586994936797"},{title:"Otimização Logística",category:"Processos",fullDesc:"Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%. Integração com sistemas de rastreamento.",metrics:[{label:"Eficiência",value:"+40%"},{label:"Entregas",value:"500+"}],image:"public/assets/img-projetos/otimizacao-logistica.jpg",tags:["Lean","Logística"],link:"#contato"},{title:"Governança de Dados",category:"Automação",fullDesc:"Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail. Padronização de nomenclatura e formatos.",metrics:[{label:"Auto",value:"100%"},{label:"Emails",value:"30+"}],image:"public/assets/img-projetos/governanca-dados.jpg",tags:["Python","Pandas"],link:"#contato"},{title:"Monitoramento Sistemas",category:"Sistemas",fullDesc:"Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva. Alertas automáticos via Slack/E-mail.",metrics:[{label:"Custos",value:"-80%"},{label:"Uptime",value:"99.9%"}],image:"public/assets/img-projetos/monitoramento-operacional.jpg",tags:["Infra","Monitoramento"],link:"#contato"}][e],o=document.createElement("div");o.className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 transition-opacity duration-300",o.innerHTML=`
        <div class="relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl transform scale-95 transition-transform duration-300 border border-white/10 flex flex-col max-h-[90vh]" id="modal-content">
            
            <!-- Botão Fechar -->
            <button onclick="closeCompactModal()" class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>

            <!-- Imagem Topo (Menor altura) -->
            <div class="h-48 w-full bg-slate-800 relative shrink-0">
                 <img src="${t.image}" class="w-full h-full object-cover">
                 <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
            
            <!-- Conteúdo Scrollável -->
            <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
                <span class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">${t.category}</span>
                <h2 class="text-2xl font-bold text-white mb-4 leading-tight">${t.title}</h2>
                
                <p class="text-gray-300 text-sm leading-relaxed mb-6">
                    ${t.fullDesc}
                </p>
                
                <!-- Métricas Compactas -->
                <div class="grid grid-cols-2 gap-3 mb-6">
                    ${t.metrics.map(a=>`
                        <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div class="text-lg font-bold text-accent">${a.value}</div>
                            <div class="text-[10px] text-gray-400 uppercase">${a.label}</div>
                        </div>
                    `).join("")}
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-6">
                    ${t.tags.map(a=>`
                        <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium text-gray-200">
                            ${a}
                        </span>
                    `).join("")}
                </div>

                <!-- Botão Ação -->
                <a href="${t.link}" onclick="closeCompactModal()" class="block w-full py-3 bg-accent text-white rounded-xl font-bold text-sm text-center hover:bg-accent-light transition-colors shadow-lg shadow-accent/20">
                    Discutir Projeto <i class="fa-solid fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    `,document.body.appendChild(o),document.body.style.overflow="hidden",requestAnimationFrame(()=>{o.style.opacity="1",document.getElementById("modal-content").classList.remove("scale-95"),document.getElementById("modal-content").classList.add("scale-100")}),o.addEventListener("click",a=>{a.target===o&&closeCompactModal()});const s=a=>{a.key==="Escape"&&(closeCompactModal(),document.removeEventListener("keydown",s))};document.addEventListener("keydown",s)};window.closeCompactModal=function(){const e=document.querySelector(".fixed.inset-0.z-\\[100\\]");e&&(e.style.opacity="0",setTimeout(()=>{e.remove(),document.body.style.overflow=""},300))};document.addEventListener("DOMContentLoaded",D);function B(){const e=document.getElementById("typewriter-text");if(!e)return;const t="Desenvolvedor Web & Analista de Dados";let o=0;const s=100;function a(){o<37&&(e.textContent+=t.charAt(o),o++,setTimeout(a,s))}setTimeout(a,1e3)}document.addEventListener("DOMContentLoaded",()=>{B()});
