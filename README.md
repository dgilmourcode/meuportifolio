
# 🚀 David Gilmour | Portfolio Profissional

Portfolio pessoal desenvolvido com **Vite + Tailwind CSS v3**, focado em performance, acessibilidade e design responsivo.

![Portfolio Preview](./src/assets/capa-readme/portifoliopreview.webp)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4.19-38B2AC)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-v8.0.8-646CFF)](https://vitejs.dev)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222)](https://pages.github.com)

---

## 📋 Sumário

- [🎯 Visão Geral](#-visão-geral)
- [📋 Pré-requisitos](#-pré-requisitos)
- [⚡ Quick Start](#-quick-start)
- [🔧 Configuração Completa](#-configuração-completa)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🛠 Comandos Essenciais](#-comandos-essenciais)
- [🎨 Personalização](#-personalização)
- [🔄 Git & GitHub](#-git--github)
- [🚀 Deploy no GitHub Pages](#-deploy-no-github-pages)
- [⚠️ Solução de Problemas](#️-solução-de-problemas)
- [♿ Acessibilidade & Performance](#-acessibilidade--performance)
- [📱 Responsividade](#-responsividade)
- [🤝 Contribuindo](#-contribuindo)
- [📝 Licença](#-licença)
- [👨‍💻 Autor](#-autor)

---

## 🎯 Visão Geral

Este portfolio foi desenvolvido para demonstrar habilidades em **Desenvolvimento Web**, **Análise de Dados** e **Automação**, utilizando as tecnologias mais modernas do mercado.

### ✨ Destaques do Projeto

| Recurso | Descrição |
|---------|-----------|
| 🎨 Design Moderno | Layout clean com gradientes, sombras e efeitos hover elegantes |
| ⚡ Performance | Build otimizado com Vite, carregamento rápido e lazy loading |
| 📱 100% Responsivo | Funciona perfeitamente em mobile, tablet e desktop |
| ♿ Acessível | Navegação por teclado, contraste WCAG e ARIA labels |
| 🔄 Animações Suaves | Intersection Observer para reveal on scroll e efeitos de hover |
| 🔍 SEO Otimizado | Meta tags, estrutura semântica e URLs amigáveis |
| 🚀 Deploy Automático | GitHub Pages com atualização automática a cada push |

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

| Ferramenta | Versão Mínima | Como Instalar | Link |
|------------|---------------|---------------|------|
| Node.js | v18.x ou superior | Download oficial ou via nvm | [nodejs.org](https://nodejs.org) |
| npm | v9.x ou superior | Instalado junto com Node.js | [npmjs.com](https://npmjs.com) |
| Git | v2.x ou superior | Download oficial | [git-scm.com](https://git-scm.com) |
| VS Code (Recomendado) | Latest | Download oficial | [code.visualstudio.com](https://code.visualstudio.com) |

### ✅ Verificar instalações

```bash
node --version    # Deve mostrar v18.x ou superior
npm --version     # Deve mostrar v9.x ou superior
git --version     # Deve mostrar v2.x ou superior
```

### 🧩 Extensões Recomendadas para VS Code

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json"
  ]
}
```

---

## ⚡ Quick Start

Para desenvolvedores que querem rodar o projeto rapidamente:

```bash
# 1. Clone o repositório
git clone https://github.com/dgilmourcode/meuportifolio.git
cd meuportifolio

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Abra no navegador
# http://localhost:5173
```

🎉 **Pronto!** O projeto está rodando com hot-reload (atualização automática ao salvar).

---

## 🔧 Configuração Completa

Guia passo a passo para criar um projeto idêntico do absoluto zero:

### 1. Criar pasta e inicializar projeto

```bash
# Criar pasta do projeto
mkdir meuportifolio
cd meuportifolio

# Inicializar projeto npm
npm init -y

# Inicializar repositório git
git init
```

### 2. Instalar dependências

```bash
# Framework e build tool
npm install -D vite

# Versao 8 é obrigatorio o esbuild
npm install -D esbuild

# Tailwind CSS e PostCSS
npm install -D tailwindcss@3 postcss autoprefixer

# Plugins adicionais
npm install -D @vitejs/plugin-legacy
```

### 3. Configurar Tailwind CSS v3

```bash
npx tailwindcss init -p
```

Isso criará dois arquivos na raiz:
- `tailwind.config.js`
- `postcss.config.js`

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. Configurar Vite

Crie o arquivo `vite.config.js` na raiz do projeto:

```javascript
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: '/meuportifolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['some-large-library'],
        },
      },
    },
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```

### 5. Estrutura de pastas

Crie a seguinte estrutura:

```
meuportifolio/
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── profile.jpg
│       └── projects/
└── src/
    ├── css/
    │   └── tailwind.css
    ├── js/
    │   └── main.js
    └── assets/
        └── fonts/
```

```bash
# Comando para criar estrutura via terminal
mkdir -p src/css src/js src/assets/fonts public/images/projects
```

### 6. Arquivo CSS principal

Crie `src/css/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans antialiased text-gray-900 bg-white;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold tracking-tight;
  }
}

/* Custom components */
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-primary-600 text-white rounded-lg 
           hover:bg-primary-700 transition-colors duration-200
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  .card {
    @apply bg-white rounded-xl shadow-lg hover:shadow-xl 
           transition-shadow duration-300 overflow-hidden;
  }

  .section-padding {
    @apply px-4 sm:px-6 lg:px-8 xl:px-12;
  }
}

/* Custom utilities */
@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

### 7. Arquivo JavaScript principal

Crie `src/js/main.js`:

```javascript
// Import CSS
import '../css/tailwind.css'

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const mobileMenu = document.getElementById('mobile-menu')

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })
}

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el)
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Throttled scroll handler
let ticking = false
function updateScrollEffects() {
  // Add scroll-based effects here
  ticking = false
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollEffects)
    ticking = true
  }
}, { passive: true })

console.log('Portfolio loaded successfully! 🚀')
```

### 8. Arquivo HTML principal

Crie `index.html` na raiz:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio de David Gilmour - Desenvolvedor Web, Analista de Dados e Especialista em Automação">
  <meta name="keywords" content="desenvolvedor web, analista de dados, automação, portfolio">
  <meta name="author" content="David Gilmour">

  <!-- Open Graph -->
  <meta property="og:title" content="David Gilmour | Portfolio">
  <meta property="og:description" content="Desenvolvedor Web & Analista de Dados">
  <meta property="og:type" content="website">

  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <title>David Gilmour | Portfolio</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body class="bg-gray-50">
  <!-- Navigation -->
  <nav class="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="#" class="text-2xl font-bold text-gradient">DG</a>

        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-8">
          <a href="#about" class="text-gray-700 hover:text-primary-600 transition-colors">Sobre</a>
          <a href="#skills" class="text-gray-700 hover:text-primary-600 transition-colors">Habilidades</a>
          <a href="#projects" class="text-gray-700 hover:text-primary-600 transition-colors">Projetos</a>
          <a href="#contact" class="text-gray-700 hover:text-primary-600 transition-colors">Contato</a>
        </div>

        <!-- Mobile menu button -->
        <button id="mobile-menu-btn" class="md:hidden p-2" aria-label="Menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
      <div class="px-4 py-2 space-y-1">
        <a href="#about" class="block py-2 text-gray-700 hover:text-primary-600">Sobre</a>
        <a href="#skills" class="block py-2 text-gray-700 hover:text-primary-600">Habilidades</a>
        <a href="#projects" class="block py-2 text-gray-700 hover:text-primary-600">Projetos</a>
        <a href="#contact" class="block py-2 text-gray-700 hover:text-primary-600">Contato</a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-32 pb-20 lg:pt-48 lg:pb-32 section-padding">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div data-animate>
          <h1 class="text-4xl lg:text-6xl font-bold mb-6">
            Olá, sou <span class="text-gradient">David Gilmour</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Desenvolvedor Web, Analista de Dados e Especialista em Automação. 
            Transformando dados em decisões e ideias em código.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="#projects" class="btn-primary">Ver Projetos</a>
            <a href="#contact" class="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
              Entre em Contato
            </a>
          </div>
        </div>
        <div class="hidden lg:block" data-animate>
          <img src="/images/profile.jpg" alt="David Gilmour" class="rounded-2xl shadow-2xl">
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-20 bg-white section-padding">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12" data-animate>Sobre Mim</h2>
      <div class="max-w-3xl mx-auto text-lg text-gray-600 text-center" data-animate>
        <p class="mb-6">
          Sou um profissional apaixonado por tecnologia, com experiência em desenvolvimento web,
          análise de dados e automação de processos. Meu objetivo é criar soluções eficientes
          e elegantes que realmente façam a diferença.
        </p>
        <p>
          Baseado em Teresina-PI, Brasil, trabalho com as tecnologias mais modernas do mercado
          para entregar projetos de alta qualidade.
        </p>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-20 bg-gray-50 section-padding">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12" data-animate>Habilidades</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Skill cards would go here -->
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="py-20 bg-white section-padding">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12" data-animate>Projetos</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Project cards would go here -->
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20 bg-gray-50 section-padding">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12" data-animate>Contato</h2>
      <div class="max-w-xl mx-auto">
        <form class="space-y-6" data-animate>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" id="name" name="name" required
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" name="email" required
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
            <textarea id="message" name="message" rows="4" required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"></textarea>
          </div>
          <button type="submit" class="w-full btn-primary">Enviar Mensagem</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12 section-padding">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <span class="text-2xl font-bold text-gradient">DG</span>
          <p class="text-gray-400 mt-2">Transformando dados em decisões</p>
        </div>
        <div class="flex space-x-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 David Gilmour. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>

  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

### 9. Configurar package.json

Substitua o conteúdo de `package.json` por:

```json
{
  "name": "meuportifolio",
  "version": "1.0.0",
  "description": "Portfolio pessoal desenvolvido com Vite + Tailwind CSS",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "keywords": [
    "portfolio",
    "vite",
    "tailwindcss",
    "web-development"
  ],
  "author": "David Gilmour",
  "license": "ISC",
  "devDependencies": {
    "@vitejs/plugin-legacy": "^5.0.0",
    "autoprefixer": "^10.4.16",
    "gh-pages": "^6.1.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}
```

### 10. Configurar .gitignore

Crie o arquivo `.gitignore` na raiz:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
dist-ssr/
*.local

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Testing
coverage/
.nyc_output/

# Cache
.cache/
.parcel-cache/
.eslintcache
.stylelintcache
```

---

## 📁 Estrutura do Projeto

```
meuportifolio/
├── .gitignore              # Arquivos ignorados pelo Git
├── index.html              # Página principal
├── package.json            # Dependências e scripts
├── postcss.config.js       # Configuração do PostCSS
├── tailwind.config.js      # Configuração do Tailwind
├── vite.config.js          # Configuração do Vite
├── README.md               # Este arquivo
├── public/                 # Assets estáticos
│   ├── favicon.ico
│   └── images/
│       ├── profile.jpg
│       └── projects/
└── src/                    # Código fonte
    ├── css/
    │   └── tailwind.css    # Estilos principais
    ├── js/
    │   └── main.js         # JavaScript principal
    └── assets/
        └── fonts/          # Fontes customizadas
```

---

## 🛠 Comandos Essenciais

| Comando | Descrição | Quando usar |
|---------|-----------|-------------|
| `npm install` | Instala todas as dependências do package.json | Após clonar o projeto ou adicionar nova dependência |
| `npm run dev` | Inicia servidor de desenvolvimento com hot-reload | Durante o desenvolvimento |
| `npm run build` | Gera build otimizado para produção na pasta dist/ | Antes de fazer deploy |
| `npm run preview` | Preview local do build de produção | Testar o build antes de deploy |
| `npm run deploy` | Build + deploy automático no GitHub Pages | Atualizar site publicado |
| `npm install -D <pacote>` | Instala dependência de desenvolvimento | Adicionar nova ferramenta |
| `npm install <pacote>` | Instala dependência de produção | Adicionar biblioteca usada no código |

### 🔍 Debug e Utilitários

```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install

# Verificar versões
npm list

# Atualizar dependências
npm update

# Verificar vulnerabilidades
npm audit
npm audit fix
```

---

## 🎨 Personalização

### Cores e Tema

Edite o arquivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      secondary: {
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
      }
    },
  },
}
```

Como usar no HTML:
```html
<div class="bg-primary-600 text-white">
  <p class="text-secondary-500">Texto colorido</p>
</div>
```

### Fontes

As fontes são carregadas via Google Fonts no `<head>` do HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Para usar no CSS:
```css
body {
  font-family: 'Inter', sans-serif;
}
```

### Animações

**Tailwind utilities:** Para animações simples
```html
<div class="transition duration-300 ease-in-out hover:scale-105">
```

**CSS customizado:** Para animações complexas (definidas em tailwind.css)
```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out;
}
```

### Componentes Reutilizáveis

Crie componentes no CSS usando `@layer components`:

```css
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-primary-600 text-white rounded-lg 
           hover:bg-primary-700 transition-colors duration-200
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  .card-hover {
    @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
  }
}
```

Uso no HTML:
```html
<button class="btn-primary">Clique aqui</button>
<div class="card card-hover">Conteúdo</div>
```

---

## 🔄 Git & GitHub

### Configuração Inicial do Git

```bash
# Configurar identidade
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Verificar configuração
git config --list

# Inicializar repositório
git init
```

### Comandos Diários Essenciais

```bash
# Ver status dos arquivos
git status

# Adicionar arquivos ao stage
git add nome-do-arquivo.js      # Arquivo específico
git add .                        # Todos os arquivos

# Criar commit
git commit -m "feat: adiciona nova funcionalidade"

# Ver histórico
git log --oneline --graph

# Desfazer alterações
git checkout -- nome-do-arquivo    # Descarta alterações
```

### Convenção de Mensagens de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: adiciona formulário de contato` |
| `fix` | Correção de bug | `fix: corrige menu mobile` |
| `docs` | Documentação | `docs: atualiza README` |
| `style` | Formatação de código | `style: ajusta indentação` |
| `refactor` | Refatoração | `refactor: otimiza função de scroll` |
| `test` | Testes | `test: adiciona testes unitários` |
| `chore` | Tarefas diversas | `chore: atualiza dependências` |

### Branches e Fluxo de Trabalho

```bash
# Criar nova branch
git checkout -b feature/nome-da-feature

# Listar branches
git branch -a

# Mudar de branch
git checkout main

# Merge de branch
git checkout main
git merge feature/nome-da-feature

# Deletar branch
git branch -d feature/nome-da-feature    # Já mergeada
git branch -D feature/nome-da-feature    # Forçar delete
```

### Conectar com GitHub Remoto

```bash
# Adicionar remote
git remote add origin https://github.com/username/repo.git

# Verificar remote
git remote -v

# Primeiro push
git push -u origin main

# Push subsequente
git push

# Pull (baixar alterações)
git pull origin main
```

### Ignorar Arquivos Sensíveis

**Nunca commitar:**
- `.env` com chaves de API
- `node_modules/` (sempre via .gitignore)
- Arquivos de build (`dist/`)
- Credenciais, senhas, tokens

---

## 🚀 Deploy no GitHub Pages

### Configuração Automática com gh-pages

1. **Verifique o package.json:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.1.0"
  }
}
```

2. **Verifique o vite.config.js:**
```javascript
export default defineConfig({
  base: '/nome-do-repositorio/',
  // ... resto da configuração
})
```

3. **Execute o deploy:**
```bash
# Instalar gh-pages (primeira vez)
npm install -D gh-pages

# Fazer deploy
npm run deploy
```

4. **Configurar no GitHub (primeira vez apenas):**
   - Acesse: `https://github.com/username/repo/settings/pages`
   - Em **Build and deployment → Source**: selecione "Deploy from a branch"
   - **Branch**: selecione `gh-pages` → `/ (root)`
   - Clique em **Save**

### Deploy Manual (Alternativa)

```bash
# Build do projeto
npm run build

# Inicializar repo na pasta dist
cd dist
git init
git add .
git commit -m "Deploy"

# Push para gh-pages
git push -f https://github.com/username/repo.git main:gh-pages

# Voltar para raiz
cd ..
```

### Verificar Deploy

```bash
# Verificar se branch gh-pages existe
git branch -a

# Verificar remote
git remote -v

# Ver último deploy
git log gh-pages --oneline -5

# Limpar cache do gh-pages
rm -rf node_modules/.cache/gh-pages
```

### Atualizar Deploy

Sempre que quiser atualizar o site publicado:

```bash
# 1. Faça suas alterações
# 2. Commit
git add .
git commit -m "feat: atualiza conteúdo"
git push origin main

# 3. Deploy
npm run deploy

# 4. Aguarde 1-2 minutos e acesse:
# https://username.github.io/nome-do-repositorio/
```

---

## ⚠️ Solução de Problemas

### 🔴 Erro: "terser not found"

**Mensagem:**
```
terser not found. Since Vite v3, terser has become an optional dependency.
```

**Solução (Recomendada - Remover Terser):**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'esbuild',  // Use esbuild em vez de terser
  },
})
```

**Solução Alternativa (Instalar Terser):**
```bash
npm install -D terser
```

### 🔴 Erro: Tailwind classes não aplicam

**Sintomas:** HTML renderiza sem estilos, classes como `bg-primary` não funcionam.

**Causas e Soluções:**

1. **Content no tailwind.config.js incorreto:**
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Verifique os caminhos!
  ],
}
```

2. **CSS não importado no main.js:**
```javascript
import '../css/tailwind.css'  // Deve estar no topo!
```

3. **PostCSS não configurado:**
```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

4. **Cache do Vite corrompido:**
```bash
rm -rf node_modules/.vite
npm run dev
```

### 🔴 Erro: 404 no GitHub Pages

**Sintomas:** Site carrega mas retorna "404 Not Found" ou assets não carregam.

**Causas e Soluções:**

1. **Base no vite.config.js incorreto:**
```javascript
// Se seu repo se chama "meuportifolio"
export default defineConfig({
  base: '/meuportifolio/',  // Deve ser exatamente o nome do repo!
})
```

2. **Caminhos de assets absolutos no HTML:**
```html
<!-- ❌ Errado -->
<img src="/images/foto.jpg">

<!-- ✅ Correto -->
<img src="./images/foto.jpg">
```

3. **Branch gh-pages não configurada no GitHub:**
   - Acesse **Settings → Pages** no repositório
   - Confirme que Source está apontando para branch `gh-pages`

### 🔴 Erro: Imagens não carregam

**Sintomas:** Ícones ou fotos aparecem quebrados.

**Soluções:**

1. **Verifique o caminho:**
```html
<!-- Imagens na pasta public -->
<img src="/images/foto.jpg">      <!-- Se estiver em public/images/ -->
<img src="./images/foto.jpg">     <!-- Relativo -->
```

2. **Extensão do arquivo:**
```bash
# Verifique se a extensão está correta
ls public/images/
# foto.jpg vs foto.jpeg vs foto.png
```

3. **Após deploy, limpe cache do navegador:**
```
Ctrl + Shift + R  # Hard reload
```

### 🔴 Erro: Cache não atualiza após deploy

**Sintomas:** Alterações no código não aparecem no site publicado.

**Soluções:**

1. **Forçar recarregamento no navegador:**
```
Ctrl + F5  ou  Ctrl + Shift + R
```

2. **Adicionar hash aos assets (Vite faz automaticamente):**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
```

3. **Invalidar cache com meta tag (temporário):**
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### 🔴 Erro: Port already in use

**Mensagem:**
```
Port 5173 is already in use
```

**Soluções:**

1. **Matar processo usando a porta:**
```bash
# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

2. **Usar outra porta:**
```bash
# Terminal 1
npm run dev -- --port 3000

# Ou no vite.config.js
export default defineConfig({
  server: {
    port: 3000,
  },
})
```

---

## ♿ Acessibilidade & Performance

### Checklist de Acessibilidade

```html
<!-- Texto alternativo para imagens -->
<img src="foto.jpg" alt="Descrição da imagem">

<!-- Labels para formulários -->
<label for="email">Email</label>
<input id="email" type="email" aria-required="true">

<!-- Botões com aria-label -->
<button aria-label="Fechar menu">×</button>

<!-- Contraste de cores -->
<!-- Use ferramentas como WebAIM Contrast Checker -->

<!-- Navegação por teclado -->
<a href="#" tabindex="0">Link acessível</a>

<!-- Skip links -->
<a href="#main" class="skip-link">Pular para conteúdo</a>
```

### Otimizações de Performance Implementadas

| Técnica | Onde | Benefício |
|---------|------|-----------|
| `content-visibility: auto` | CSS | ~20% menos tempo de render inicial |
| `contain: layout style paint` | CSS | Isola reflows, melhor scroll |
| `will-change: transform` | CSS | GPU acceleration em animações |
| Throttle (100ms) em scroll | JS | Reduz cálculos em ~90% |
| `requestAnimationFrame` | JS | Sincroniza animações com refresh rate |
| Passive event listeners | JS | Scroll mais fluido em mobile |
| Preconnect DNS | HTML | ~100ms mais rápido no carregamento de fonts |
| `font-display: swap` | CSS | Evita FOIT (Flash of Invisible Text) |
| Build minificado | Vite | Bundle ~60% menor que código fonte |

### Métricas Esperadas (Lighthouse)

| Métrica | Alvo |
|---------|------|
| Performance | 90+ |
| Acessibilidade | 100 |
| Best Practices | 100 |
| SEO | 100 |
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.8s |

---

## 📱 Responsividade

### Breakpoints Tailwind (Mobile-First)

```css
/* Mobile (default) */
/* sm: */ @media (min-width: 640px) { }
/* md: */ @media (min-width: 768px) { }
/* lg: */ @media (min-width: 1024px) { }
/* xl: */ @media (min-width: 1280px) { }
/* 2xl: */ @media (min-width: 1536px) { }
```

### Exemplos de Uso

```html
<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Texto responsivo -->
<h1 class="text-2xl md:text-4xl lg:text-5xl">

<!-- Padding responsivo -->
<div class="px-4 sm:px-6 lg:px-8">

<!-- Layout flex responsivo -->
<div class="flex flex-col md:flex-row">

<!-- Hidden/Visible -->
<div class="hidden md:block">Só aparece em desktop</div>
<div class="md:hidden">Só aparece em mobile</div>
```

### Testar Responsividade

```bash
# DevTools do navegador
F12 → Toggle device toolbar (Ctrl + Shift + M)

# Testar em dispositivos reais
# - iOS Safari
# - Android Chrome
# - Diferentes tamanhos de tela

# Ferramentas online
# - BrowserStack
# - Responsinator
# - Am I Responsive
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. **Fork o repositório**

2. **Crie uma branch para sua feature**
```bash
git checkout -b feature/minha-feature
```

3. **Faça suas alterações e teste localmente**

4. **Commit com mensagem descritiva**
```bash
git commit -m "feat: adiciona nova funcionalidade X"
```

5. **Push para sua branch**
```bash
git push origin feature/minha-feature
```

6. **Abra um Pull Request no repositório original**

### Padrões de Código

- Use 2 espaços para indentação
- Siga a convenção de nomes do Tailwind (kebab-case para classes)
- Comente código complexo com `//` ou `/* */`
- Mantenha linhas com máximo de 100 caracteres

---

## 📝 Licença

Este projeto está licenciado sob a licença **ISC**.

```
ISC License

Copyright (c) 2024 David Gilmour

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 👨‍💻 Autor

**David Gilmour**

- 🔗 [LinkedIn](https://linkedin.com/in/dgilmourcode)
- 🐙 [GitHub](https://github.com/dgilmourcode)
- 📧 davidgilmour144@gmail.com
- 📍 Teresina-PI, Brasil

> "Transformando dados em decisões e ideias em código."

---

<div align="center">


[⬆️ Voltar ao topo](#-david-gilmour--portfolio-profissional)

</div>
