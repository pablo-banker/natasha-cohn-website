# Celebrante Natasha Cohn — site institucional

Site autoral da celebrante de casamentos Natasha Cohn, reconstruído a partir do
Wix. Editorial, humano e emocional, preservando a identidade da marca —
**amor, humor, poesia e alma**.

> Cerimônias autorais, escritas a seis mãos. "Celebro onde o amor chamar."

## Tecnologias

- **SvelteKit** + **Svelte 5** (runes) — SSR, form actions, roteamento por arquivos
- **TypeScript** (strict)
- **Tailwind CSS v4** (tokens via `@theme`, também expostos como CSS custom properties)
- **GSAP** + **ScrollTrigger** + **SplitText** (carregados sob demanda)
- **Zod** (validação cliente + servidor)
- **@lucide/svelte** (ícones funcionais) — ícones de marca são SVG próprios
- **marked** (blog em Markdown)
- **Fontes auto-hospedadas** (`@fontsource` — Fraunces + Inter)
- **Vitest** + **@testing-library/svelte** (unit/componentes) · **Playwright** (E2E)
- **ESLint** + **Prettier**

## Requisitos

- Node.js 20+ (desenvolvido com Node 22)
- npm

## Instalação

```bash
npm install
cp .env.example .env   # e preencha conforme necessário
```

## Comandos

| Comando            | O que faz                             |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento (Vite)    |
| `npm run build`    | Build de produção                     |
| `npm run preview`  | Serve o build de produção localmente  |
| `npm run check`    | `svelte-check` (typecheck)            |
| `npm run lint`     | Prettier (check) + ESLint             |
| `npm run format`   | Formata tudo com Prettier             |
| `npm test`         | Testes unitários/componentes (Vitest) |
| `npm run test:e2e` | Testes de ponta a ponta (Playwright)  |

## Estrutura

```
src/
├── lib/
│   ├── animations/     GSAP helpers (reveal, parallax, magnetic, scroll, text)
│   ├── components/      layout · navigation · home · ceremonies · rituals ·
│   │                    testimonials · video · blog · contact · ui
│   ├── content/         TEXTOS E DADOS (site, home, about, ceremonies,
│   │                    rituals, process, testimonials, videos, social,
│   │                    privacy, blog-index, blog/*.md)
│   ├── schemas/         Zod (contato)
│   ├── seo/             componente Seo + dados estruturados (JSON-LD)
│   ├── server/          envio ao Google Form, ação de contato, blog (server-only)
│   ├── stores/          idioma (Svelte 5 .svelte.ts)
│   ├── types/           tipos de domínio
│   └── utils/           motion, format, nav
├── routes/              /, a-celebrante, cerimonias, ritos, depoimentos,
│                        blog, blog/[slug], contato, politica-de-privacidade,
│                        sitemap.xml, robots.txt, +error
├── app.css              design tokens (@theme) + base + utilitários
├── app.html
└── hooks.server.ts      redirects 301 do Wix + cabeçalhos de segurança
docs/                    BRAND_AUDIT · CONTENT_MAP · MIGRATION · ANIMATION_GUIDE
static/                  favicon, manifest, (logo/images/og — a enviar)
e2e/                     testes Playwright
```

Princípio central: **conteúdo separado da apresentação**. Nenhum texto longo
mora em componente — tudo em `src/lib/content/`.

## Editar conteúdo

Veja `docs/CONTENT_MAP.md` para o mapa completo. Resumo:

- **Números / hero / intros:** `src/lib/content/home.ts`
- **Bio da celebrante:** `src/lib/content/about.ts`
- **Serviços:** `src/lib/content/ceremonies.ts`
- **Ritos:** `src/lib/content/rituals.ts`
- **Contatos / navegação / logo:** `src/lib/content/site.ts`

### Incluir imagens

Coloque o arquivo (AVIF/WebP de preferência) em `static/images/` e aponte o
caminho no campo `image` do conteúdo correspondente (ex.: `ceremonies.ts`).
O componente `ImageFrame` cuida de `lazy`, `sizes` e proporção. Enquanto o
campo for `null`, aparece um marcador editorial de "fotografia a enviar".

### Incluir um depoimento

Adicione um objeto em `src/lib/content/testimonials.ts` com `author` e `quote`.
**Nunca inventar nem editar o sentido.**

### Criar um artigo

1. Crie `src/lib/content/blog/<slug>.md` (Markdown).
2. Adicione os metadados em `src/lib/content/blog-index.ts`.
   O slug do arquivo = slug da URL (`/blog/<slug>`).

### Adicionar um vídeo

Em `src/lib/content/videos.ts`, adicione
`{ title, description, youtubeId: 'ID', poster: null }`. O grid de players com
modal (carregamento sob demanda) aparece automaticamente na home.

## Variáveis de ambiente

Ver `.env.example`. Resumo:

| Variável              | Para quê                                                     |
| --------------------- | ------------------------------------------------------------ |
| `GOOGLE_FORM_URL`     | endpoint `.../formResponse` do Google Form (backend do form) |
| `GOOGLE_FORM_ENTRIES` | JSON mapeando cada campo ao `entry.XXXX` do Google Form      |
| `CONTACT_RATE_LIMIT`  | limite de envios por 10 min (padrão 3)                       |

Nenhuma credencial fica no front-end. O envio do formulário roda em rota
server-side (`+page.server.ts` → `src/lib/server/`).

## Configuração do formulário

O formulário do site envia, por baixo dos panos, para um **Google Form** (as
respostas caem na planilha do Google Forms). Configure `GOOGLE_FORM_URL` e
`GOOGLE_FORM_ENTRIES` — o `.env.example` traz o passo a passo de como criar o
formulário e descobrir os IDs (`entry.XXXX`) de cada campo. Sem essas variáveis,
o envio roda em modo desenvolvimento (não envia, só confirma).

## Deploy

`@sveltejs/adapter-auto` detecta a plataforma. Na **Vercel**, funciona sem
configuração. Defina as variáveis de ambiente no painel do host. Para controle
fino (regiões/ISR), troque por `@sveltejs/adapter-vercel`.

Ver `docs/MIGRATION.md` para domínio, Search Console, redirects 301 e o
checklist de homologação (não remover o Wix antes de concluí-lo).

## Testes

```bash
npm run lint      # prettier + eslint
npm run check     # svelte-check
npm test          # unit/componentes (Vitest)
npm run test:e2e  # Playwright (build + preview automáticos)
```

Cobertura: renderização das páginas, navegação, menu mobile (focus trap, ESC,
retorno de foco), formulário (validação cliente/servidor, sucesso, honeypot,
LGPD), carrossel (teclado, pausa), redirects 301, sitemap/robots, ausência de
rolagem horizontal (360→1920px), alvos de toque, `prefers-reduced-motion` e o
site **funcionando sem JavaScript**.

## Acessibilidade

Meta **WCAG 2.2 AA**: HTML semântico, hierarquia de headings, skip link, foco
visível, focus trap no menu/modal, retorno de foco, contraste adequado, labels
reais, `alt` text, carrossel navegável por teclado, `prefers-reduced-motion` e
alvos de toque adequados.

## Animações

GSAP a serviço da narrativa, carregado sob demanda, com degradação sem JS e
respeito total a `prefers-reduced-motion`. Ver `docs/ANIMATION_GUIDE.md`.

## Documentação

- [`docs/BRAND_AUDIT.md`](docs/BRAND_AUDIT.md) — paleta, tipografia, decisões
- [`docs/CONTENT_MAP.md`](docs/CONTENT_MAP.md) — onde vive cada conteúdo e pendências
- [`docs/MIGRATION.md`](docs/MIGRATION.md) — URLs, 301, domínio, checklist, rollback
- [`docs/ANIMATION_GUIDE.md`](docs/ANIMATION_GUIDE.md) — helpers e princípios de movimento
