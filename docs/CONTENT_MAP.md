# Mapa de conteúdo

Onde vive cada texto/imagem do site e o que ainda precisa de revisão da
Natasha. **Todo o conteúdo está separado da apresentação** — nada de texto
longo dentro de componente.

## Arquivos de conteúdo (`src/lib/content/`)

| Arquivo           | O que contém                                                        | Precisa revisão?                |
| ----------------- | ------------------------------------------------------------------- | ------------------------------- |
| `site.ts`         | Marca, contatos, telefones, WhatsApp, navegação, idiomas, `logoSrc` | ⚠️ WhatsApp e logo (ver abaixo) |
| `home.ts`         | Hero, `stats`, manifesto, intros de seção, CTA final                | ⚠️ tom dos textos               |
| `about.ts`        | Página "A celebrante": bio, valores, idiomas, regiões               | ⚠️ tom / badge                  |
| `ceremonies.ts`   | 6 serviços reais com descrições                                     | ⚠️ descrições                   |
| `rituals.ts`      | 8 ritos com significado e "quando faz sentido"                      | ⚠️ significados                 |
| `process.ts`      | 6 etapas de criação da cerimônia                                    | ⚠️ etapas                       |
| `testimonials.ts` | 15 depoimentos reais (verbatim)                                     | ✅ não editar sentido           |
| `social.ts`       | Instagram, Facebook, YouTube                                        | ✅ confirmado                   |
| `videos.ts`       | Estrutura de vídeos                                                 | ⚠️ IDs pendentes                |
| `privacy.ts`      | Política de privacidade (LGPD)                                      | ⚠️ revisão jurídica             |
| `blog-index.ts`   | Metadados dos 2 posts                                               | ✅ datas/autoria reais          |
| `blog/*.md`       | Corpo dos 2 posts (Markdown)                                        | ⚠️ conferir contra o Wix        |

## Pendências que exigem a Natasha

1. **Logotipo** ✅ — recebido e integrado. O símbolo real (mandala) foi
   recortado em alta resolução para `static/logo/mark.png` e aparece no
   cabeçalho e no rodapé; o lockup completo está em
   `static/logo/natasha-cohn-lockup.avif`. Favicon/ícones derivados dele.
   _Melhoria opcional futura:_ um **SVG vetorial** do símbolo deixaria o logo
   perfeitamente nítido em qualquer tamanho (basta apontar `site.markSrc`).
2. **Número de WhatsApp** ⚠️ — o site atual mostra `+55 24 97438-3237`
   (combinando o DDD 24 com o número do telefone de DDD 21). Confirmar o número
   correto em `site.whatsapp.number`.
3. **Fotografias** — parcialmente recebidas:
   - ✅ **5 fotos de celebração** integradas (hero, manifesto, "sobre",
     casamentos, bilíngues, apadrinhamento) — `static/images/celebracoes/`.
   - ✅ **15 fotos de depoimentos** (uma por casal) — aparecem como avatar no
     carrossel e na página de depoimentos — `static/images/depoimentos/`.
   - ⚠️ **Ainda pendentes:** um retrato dedicado da Natasha (hoje a hero e o
     "sobre" usam fotos dela conduzindo cerimônias, o que funciona bem);
     fotos específicas dos **ritos**; fotos para "15 anos", "mentoria" e
     "corporativo"; capas dos posts; imagem OG. Ver `docs/MIGRATION.md`.
4. **Vídeos** ⚠️ — preencher os IDs do YouTube em `videos.ts` (ver abaixo).
5. **Revisão dos textos** — todos os textos novos são um ponto de partida
   escrito com a voz da marca; a Natasha deve lê-los e ajustar o tom.
6. **Depoimentos** — ✅ os **16 depoimentos completos** foram transcritos na
   íntegra da página oficial (`/depoimentos`), com foto por casal. Inclui
   "Luiza e Sergio" (agora com o texto completo) e os dois depoimentos de
   "Jéssica e Alexandre" (renovação de votos + casamento). "Thais e Yuri" e
   "Toque de Cinema Films" não constam nessa página (vinham da home) e foram
   removidos para refletir a fonte pedida.
7. **Política de privacidade** — precisa de revisão jurídica e dos dados do
   controlador (CPF/CNPJ), que **não foram inventados** (marcados como
   "DADO PENDENTE" no texto).

## Depoimentos migrados (íntegra, da página /depoimentos, com foto)

Luiza e Sergio · Amanda e Luan · Camila e Nero · Mirella e Neto ·
Thássia e Paulo Vitor · Sione e Mônica · Josi e Bruno · Lucas e Márcio ·
Juliana e Fernanda · Aline e Aleff · Weslley e Jonathan · Yara e Rhuan ·
Juliana e Marco · Jéssica e Alexandre (renovação de votos) ·
Jéssica e Alexandre (casamento) · Carolina e Wagner.

> Regra: **nunca** inventar depoimentos nem editar o sentido dos existentes.
> Os textos foram transcritos da página oficial; corrigimos apenas
> espaçamentos/acentos claramente perdidos na captura, preservando a voz de
> cada casal. Os 5 depoimentos com `featured: true` também têm um `highlight`
> (frase real do próprio texto) usado no carrossel da home.

## Serviços (reais, confirmados)

Casamentos · Cerimônias bilíngues · Apadrinhamento · Celebrações de amor
(15 anos) · Mentoria para celebrantes · Eventos corporativos.

> O submenu de "Cerimônias" só lista serviços confirmados. Não adicionar
> serviços não confirmados (ex.: elopement, bodas) sem validar com a Natasha.

## Ritos (reais, da página /ritos)

Cerimônia das areias · Plantio da árvore · Handfasting (celta) · Lava-pés ·
Purificação das mãos · Purificação das alianças · Filtro dos sonhos ·
Deixar ir dos balões.

## Como editar

- **Trocar um número/estatística:** `home.ts` → `stats`.
- **Adicionar um depoimento:** acrescente um objeto em `testimonials.ts`.
- **Adicionar um rito:** acrescente em `rituals.ts` (slug único).
- **Adicionar um vídeo:** em `videos.ts`, adicione `{ title, description,
youtubeId: 'ABC123', poster: null }`. O grid de players aparece sozinho.
- **Criar um artigo:** crie `src/lib/content/blog/<slug>.md` e adicione os
  metadados em `blog-index.ts`. O slug do arquivo = slug da URL.
