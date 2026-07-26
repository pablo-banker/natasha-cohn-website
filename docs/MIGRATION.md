# Migração do Wix → SvelteKit

## 1. Mapa de páginas e URLs

| Página                | URL antiga (Wix)                                                            | URL nova                                       | Ação       |
| --------------------- | --------------------------------------------------------------------------- | ---------------------------------------------- | ---------- |
| Início                | `/`                                                                         | `/`                                            | —          |
| A celebrante          | `/a-celebrante`                                                             | `/a-celebrante`                                | preservada |
| Cerimônias / serviços | `/services-4`                                                               | `/cerimonias`                                  | **301**    |
| Depoimentos           | `/depoimentos`                                                              | `/depoimentos`                                 | preservada |
| Ritos                 | `/ritos`                                                                    | `/ritos`                                       | preservada |
| Vídeos                | `/videos`                                                                   | `/#videos` (seção da home)                     | **301**    |
| Contato               | `/vamos-conversar`                                                          | `/contato`                                     | **301**    |
| Blog                  | `/blog`                                                                     | `/blog`                                        | preservada |
| Artigo — ritos        | `/post/os-ritos-de-uma-cerimônia-de-casamento-simbolismo-além-da-religião`  | `/blog/os-ritos-de-uma-cerimonia-de-casamento` | **301**    |
| Artigo — regimes      | `/post/os-regimes-de-casamento-entendendo-as-escolhas-e-implicações-legais` | `/blog/os-regimes-de-casamento`                | **301**    |
| Privacidade           | — (novo)                                                                    | `/politica-de-privacidade`                     | novo       |

Os slugs dos artigos foram simplificados (os originais tinham acentos
percent-encoded e eram longos). Qualquer outro `/post/*` antigo é redirecionado
para `/blog`.

### Onde os redirects vivem

`src/hooks.server.ts` — mapa `permanentRedirects` (301) + normalização de
barra final e de acentos. Também aplica os **cabeçalhos de segurança**.
Os redirects foram **verificados por teste E2E** (`e2e/pages.spec.ts`).

## 2. Conteúdo migrado

- ✅ Textos de todas as páginas (reescritos com a voz da marca — ver
  `docs/CONTENT_MAP.md` para o que precisa de revisão).
- ✅ 15 depoimentos reais (verbatim).
- ✅ 8 ritos, 6 serviços, 6 etapas de processo.
- ✅ 2 posts de blog com **texto integral e capas** migrados da página oficial
  (`/blog`) — título, data, autoria e slug preservados; imagens de capa em
  `static/images/blog/`.
- ✅ Contatos, telefones, e-mail, redes sociais, canal do YouTube.

## 3. Conteúdo / assets pendentes

| Item                                    | Onde entra                                    | Observação                                                            |
| --------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| Logotipo                                | `static/logo/` + `site.markSrc`               | ✅ integrado (SVG vetorial seria bônus)                               |
| Foto da hero / "sobre"                  | `home.ts` / `about.ts`                        | ✅ usando fotos da Natasha conduzindo                                 |
| Fotos de celebração (5)                 | `static/images/celebracoes/`                  | ✅ integradas (hero, manifesto, cerimônias)                           |
| Fotos de depoimentos (15)               | `static/images/depoimentos/`                  | ✅ integradas (avatar por casal)                                      |
| Retrato dedicado da Natasha             | `home.ts` `hero.portrait`                     | ⚠️ opcional — hoje usa foto conduzindo                                |
| Serviços (texto + fotos de /services-4) | `ceremonies.ts` + `static/images/cerimonias/` | ✅ migrados verbatim (15 anos, mentoria, apadrinhamento, corporativo) |
| Fotos dos ritos (8)                     | `static/images/ritos/`                        | ✅ migradas do Wix (uma por rito)                                     |
| Capas dos posts                         | `static/images/blog/`                         | ✅ migradas do Wix (2 artigos)                                        |
| Imagem OG social                        | `static/og/og-default.jpg`                    | ⚠️ 1200×630, pendente                                                 |
| Vídeos do YouTube (4)                   | `videos.ts`                                   | ✅ 4 filmes na home (facade + modal, carrega no clique)               |
| Ícones PWA                              | `static/icons/` + `static/favicon.png`        | ✅ gerados do símbolo real                                            |

> **Nota sobre formato das imagens:** as fotos foram servidas em **AVIF** (o
> formato enviado). Atenção: o `sips` do macOS **corrompe o canal alpha** ao
> re-encodar AVIF (a imagem fica transparente) — por isso os originais foram
> usados como estão. Para gerar versões responsivas menores, prefira `cwebp`,
> `avifenc` (libavif) ou um pipeline de build (ex.: `@sveltejs/enhanced-img`),
> não o `sips`. A maior (`celebracao-2`, ~600 KB) é carregada _lazy_, abaixo da
> dobra; otimizá-la é uma melhoria opcional.

**Formato recomendado das imagens:** exportar em AVIF/WebP quando possível,
com dimensões definidas para evitar layout shift. O `ImageFrame` já cuida de
`loading="lazy"`, `sizes` e proporção; o retrato da hero usa `priority`.

## 4. Configuração de domínio e infra

1. **Hospedagem:** o projeto usa `@sveltejs/adapter-auto`. Para produção na
   Vercel, funciona automaticamente. (Opcional: trocar por
   `@sveltejs/adapter-vercel` para controle fino de regiões/ISR.)
2. **Variáveis de ambiente:** copiar `.env.example` → configurar no painel do
   host (`GOOGLE_FORM_URL` + `GOOGLE_FORM_ENTRIES`).
3. **Domínio:** apontar `celebrantenatashacohn.com.br` para o novo host
   **apenas depois** da homologação (ver checklist). Ajustar `site.url` se o
   domínio final mudar.
4. **DNS/SSL:** garantir HTTPS (o `Strict-Transport-Security` já é enviado).

## 5. Search Console

- **Sem analytics/rastreamento:** o site não usa Google Analytics nem cookies
  de rastreamento (por decisão do projeto). Por isso também não há aviso de
  cookies. Se um dia quiser medir acessos de forma privada, dá para adicionar
  uma solução sem cookies (ex.: Plausible/Umami) depois.
- **Search Console:** verificar a propriedade do novo domínio; enviar
  `‎/sitemap.xml`. Reenviar as URLs antigas para o Google recadastrar os 301.

## 6. Formulário de contato

- **Backend: Google Forms.** O site tem o próprio formulário; ao enviar, o
  servidor posta os dados no `.../formResponse` do Google Form (as respostas
  caem na planilha do Forms). Configuração em `.env` → `GOOGLE_FORM_URL` e
  `GOOGLE_FORM_ENTRIES` (JSON mapeando cada campo ao `entry.XXXX`). Ver
  `.env.example` para o passo a passo de como obter os IDs.
- Sem essas variáveis (dev/testes), o envio roda em modo local: nada é
  enviado, apenas confirma o recebimento.
- Validação com Zod **no cliente e no servidor** (mesmo esquema).
- Honeypot + rate limit (`CONTACT_RATE_LIMIT`, padrão 3/10min, só conta envios
  válidos). Em serverless o rate limit é por instância — para tráfego alto,
  migrar para um store compartilhado (ex.: Upstash/Redis).
- **Testado** com e sem JavaScript (`e2e/contact.spec.ts`, `e2e/motion.spec.ts`)
  e o mapeamento de campos por unidade (`googleForm.test.ts`).

## 7. Checklist antes de publicar (NÃO remover o Wix antes disto)

- [x] Logotipo real integrado (símbolo no cabeçalho/rodapé + favicon/ícones).
- [x] Fotos de celebração (hero/manifesto/cerimônias) e de depoimentos integradas.
- [ ] Fotos restantes (ritos, 15 anos/mentoria/corporativo, capas de blog) enviadas.
- [ ] Número de WhatsApp confirmado.
- [ ] IDs de vídeo preenchidos (ou manter o CTA para o canal).
- [ ] Textos revisados pela Natasha.
- [ ] Política de privacidade revisada juridicamente.
- [ ] Google Form criado; `GOOGLE_FORM_URL` + `GOOGLE_FORM_ENTRIES` configurados
      e **formulário testado em produção** (resposta caindo na planilha).
- [ ] Imagem OG (`static/og/og-default.jpg`) no lugar.
- [ ] Todas as páginas conferidas em homologação (staging).
- [ ] Redirects 301 conferidos no domínio real.
- [ ] `npm run lint && npm run check && npm test && npm run build` verdes.
- [ ] Sitemap enviado ao Search Console.

## 8. Plano de rollback

1. Manter o site Wix **publicado e no ar** durante toda a homologação.
2. Publicar o novo site em um subdomínio de staging
   (ex.: `novo.celebrantenatashacohn.com.br`) antes de tocar no domínio raiz.
3. A troca de domínio é só uma alteração de DNS/CNAME — se algo falhar,
   **reverter o DNS** para o Wix restaura o site antigo em minutos.
4. Só cancelar o plano do Wix depois de alguns dias com o novo site estável e
   com os 301 confirmados no Search Console.
