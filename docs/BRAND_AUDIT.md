# Auditoria da marca — Celebrante Natasha Cohn

> Documento vivo. Registra o que foi apurado no site atual (Wix) e as decisões
> tomadas para a nova interface. **Itens marcados com ⚠️ dependem de confirmação
> da Natasha ou de arquivos ainda não enviados.**

Fonte auditada: <https://www.celebrantenatashacohn.com.br/> (Wix), páginas
`/`, `/a-celebrante`, `/services-4`, `/depoimentos`, `/ritos`, `/videos`,
`/vamos-conversar`, `/blog` e os dois posts publicados.

---

## 1. Identidade verbal apurada (fatos)

Estes conceitos vieram do próprio site e foram **preservados** na nova escrita:

- **"Amor, humor, poesia e alma"** — assinatura da marca.
- **"Escrita a seis mãos"** — método (as mãos da Natasha e as do casal).
- **"Histórias reais"** / **"celebrante de histórias reais"**.
- **"Celebro onde o amor chamar"**.
- Valores: **autenticidade, verdade, leveza, amor e humor**.
- **"Nada é obrigatório"** — sobre ritos e formato.
- **"Eleita uma das melhores celebrantes do país"** ⚠️ — afirmação presente no
  site atual. Preservada como texto de marca; **não** foi convertida em nota
  ou avaliação (Review/Rating) nos dados estruturados, para não inventar
  métrica inexistente.

### Números de autoridade (reais — não inventar)

| Dado             | Valor                           | Origem                          |
| ---------------- | ------------------------------- | ------------------------------- |
| Celebrante desde | **2018**                        | /a-celebrante                   |
| Cerimônias       | **+380** exclusivas             | /a-celebrante                   |
| Idiomas          | **Português, Inglês, Espanhol** | /a-celebrante                   |
| Alcance          | "onde o amor chamar" (base RJ)  | /a-celebrante, /vamos-conversar |

Estão centralizados em `src/lib/content/home.ts` (`stats`) e protegidos por
teste (`src/lib/content/content.test.ts`).

---

## 2. Paleta de cores

✅ **Cores confirmadas a partir do logotipo oficial** (`nc assets`: `logo.png`
e `NC-slogan.avif`). O lockup é uma **mandala terracota/cobre com corações
turquesa e pétalas creme**, o nome "Natasha Cohn" em script cobre e o slogan
em turquesa. As cores foram extraídas por amostragem dos pixels do logotipo
(símbolo + wordmark + slogan):

- **Símbolo/wordmark (primária):** `#AA5A28` (dominante), variações
  `#B4783C`/`#DC965A`.
- **Corações + slogan (secundária):** `#5AA0A0` / `#4F9E9E` (turquesa/teal).
- **Pétalas (creme):** `#DCC8AA`.

> Correção importante em relação à versão anterior desta auditoria: a
> secundária **não** é verde-oliva — é **turquesa/teal**. A paleta foi
> ajustada para refletir o logotipo real.

Os assets originais estão em `static/logo/` (`mark.png` = símbolo recortado em
alta resolução com fundo transparente; `natasha-cohn-lockup.avif|png` = lockup
completo). Ícones/favicon derivados em `static/favicon.png` e `static/icons/`.

Todos os tokens vivem em `src/app.css` (bloco `@theme`) e estão disponíveis
como utilitários Tailwind e como CSS custom properties.

| Token                | HEX       | RGB         | Origem / uso                           |
| -------------------- | --------- | ----------- | -------------------------------------- |
| `--color-paper`      | `#F4EEE4` | 244 238 228 | fundo principal (papel quente)         |
| `--color-paper-deep` | `#ECE2D2` | 236 226 210 | faixas de seção                        |
| `--color-surface`    | `#FBF8F1` | 251 248 241 | cartões / superfícies                  |
| `--color-night`      | `#221F1B` | 34 31 27    | seções escuras (vídeos, rodapé)        |
| `--color-ink`        | `#23201C` | 35 32 28    | texto principal                        |
| `--color-ink-soft`   | `#6A5F54` | 106 95 84   | texto de apoio                         |
| `--color-ink-mute`   | `#8C8073` | 140 128 115 | legendas / meta                        |
| `--color-clay`       | `#A85A28` | 168 90 40   | **primária** — terracota/cobre do logo |
| `--color-clay-deep`  | `#8A4820` | 138 72 32   | hover da primária                      |
| `--color-clay-soft`  | `#DC965A` | 220 150 90  | cobre claro (realce)                   |
| `--color-teal`       | `#4F9E9E` | 79 158 158  | **secundária** — turquesa do logo      |
| `--color-teal-deep`  | `#3D7F7F` | 61 127 127  | turquesa escura (texto sobre claro)    |
| `--color-blush`      | `#E7D2B7` | 231 210 183 | creme das pétalas — pseudo-elementos   |
| `--color-brass`      | `#B0894F` | 176 137 79  | acento (uso comedido)                  |
| `--color-border`     | `#DED1BF` | 222 209 191 | linhas / bordas                        |

### Contraste (WCAG)

- `ink` sobre `paper` → ~13:1 (AAA).
- `ink-soft` sobre `paper` → ~5.6:1 (AA para texto normal).
- `paper` sobre `clay` (botão primário) → ~5:1 (AA).
- `teal-deep` sobre `paper` → ~4.6:1 (AA).
- `paper` sobre `night` (seções escuras) → ~14:1 (AAA).

### Sistema de uso das duas cores da marca

O logotipo combina **cobre + turquesa** — o cobre no símbolo e no nome; a
turquesa nos corações e no slogan ("Celebrações com amor, humor, poesia e
alma"). A interface espelha essa lógica:

- **Cobre/clay = ação e estrutura** — CTAs, botões, eyebrows das seções,
  números de autoridade, item ativo do menu, links de contato.
- **Turquesa/teal = poesia e acento** — frases manuscritas em itálico (pull
  quotes, "celebro onde o amor chamar", frases-fecho), a linha do processo,
  o traço do arco do retrato, as aspas dos depoimentos, molduras e detalhes
  delicados, o selo "eleita uma das melhores celebrantes".

Assim as duas cores da marca convivem em toda página, como no logo. Rosa/dourado
exagerados foram **evitados** de propósito. O `blush`/creme (pétalas) entra só
em camadas decorativas de baixa saturação.

---

## 3. Tipografia

⚠️ As fontes originais do Wix não foram identificadas com certeza. Adotamos
alternativas **gratuitas, com licença aberta (OFL) e auto-hospedadas** via
`@fontsource`, escolhidas para o caráter editorial e afetivo da marca. Se a
Natasha tiver fontes específicas de marca, é só substituir os tokens
`--font-display` / `--font-body` em `src/app.css`.

| Papel                 | Fonte                                       | Token            | Justificativa                                                                            |
| --------------------- | ------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| Display / títulos     | **Fraunces** (variável, com optical sizing) | `--font-display` | serifada expressiva, "old-style", ótima em tamanhos grandes; transmite editorial e afeto |
| Corpo                 | **Inter** (variável)                        | `--font-body`    | humanista, altíssima legibilidade em telas                                               |
| Destaque / manuscrito | **Fraunces Itálico**                        | `--font-accent`  | interpretação sóbria da "carta manuscrita" sem cair em fonte-script clichê               |

Decisão consciente: **apenas 2 famílias** (Fraunces + Inter), para performance
(mínimo de pesos, `font-display: swap`, subsetadas automaticamente pelo
Fontsource — os `.woff2` finais ficam entre ~48 e ~85 KB por subset).

Escala tipográfica fluida (clamp) definida em `@theme`:
`--text-eyebrow`, `--text-lead`, `--text-h4…h1`, `--text-display`.

---

## 4. Estilo fotográfico

Observado: fotografia documental de casamentos, com pessoas reais, luz natural,
momentos de emoção e riso. **Nenhuma foto foi capturada nem gerada por IA** —
o briefing proíbe explicitamente, e as imagens reais ainda serão enviadas.

Enquanto isso, a interface usa um **marcador editorial de "fotografia a
enviar"** (`src/lib/components/ui/ImageFrame.svelte`): moldura fina + legenda
em itálico com o `alt` real, mantendo proporção (sem layout shift) e sem
parecer quebrado. Ver `docs/MIGRATION.md` para a lista de imagens pendentes.

Tratamento visual das fotos na nova interface:

- Retrato da hero em **arco orgânico** (`PortraitFrame`), com traço e mancha
  de cor atrás (profundidade), revelado por máscara (clip-path).
- Demais imagens em proporções editoriais (4/5, 3/4, 3/2), com revelação por
  máscara ao entrar na viewport e parallax sutil.

---

## 5. Elementos a preservar

- Logotipo original ⚠️ (pendente — hoje há um _wordmark_ tipográfico provisório
  em `Logo.svelte`; **o logo não deve ser substituído por texto na versão
  final**).
- Assinatura verbal "amor, humor, poesia e alma".
- Conceito "escrita a seis mãos" e "histórias reais".
- Depoimentos reais (nomes dos casais) — transcritos sem editar o sentido.
- Ritos reais e seus nomes.
- Aviso de direitos no rodapé: "Proibida reprodução total ou parcial sem
  autorização".
- Contatos, redes sociais e canal do YouTube.

---

## 6. Problemas do site atual (Wix) e oportunidades

| Problema observado                                                              | Oportunidade na nova interface                                                              |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Textos com traços de linguagem genérica ("oferecemos serviços personalizados…") | Reescrita humana e conversacional (marcada para revisão da Natasha)                         |
| Estrutura de página fragmentada, cara de template                               | Layout editorial autoral, seções com identidade própria                                     |
| Vídeos só linkados ao canal, sem player integrado                               | Player com carregamento sob demanda + modal acessível (quando houver IDs)                   |
| Sem dados estruturados / SEO técnico frágil                                     | JSON-LD (Person, ProfessionalService, WebSite, Article, Breadcrumb), sitemap, canonical, OG |
| Depoimentos em lista estática                                                   | Depoimento em destaque + carrossel acessível (teclado, pausa, sem loop rápido)              |
| Performance típica do Wix (scripts pesados)                                     | SSR + fontes locais + GSAP sob demanda + imagens lazy                                       |
| Acessibilidade não garantida                                                    | Meta WCAG 2.2 AA: foco visível, skip link, focus trap, reduced motion                       |

---

## 7. Decisões de interface (resumo)

1. **Paleta quente editorial** (papel/terracota/oliva) — provisória até o logo.
2. **Fraunces + Inter**, auto-hospedadas, 2 famílias só.
3. **Natasha como rosto** na hero (retrato em arco, texto à esquerda).
4. **Nada de cards genéricos**: serviços em faixas editoriais; ritos com
   grafismos delicados desenhados em `::before`.
5. **Movimento a serviço da narrativa**: revelações, desenho de linha SVG no
   processo, parallax sutil — tudo com `prefers-reduced-motion` e degradação
   sem JS.
6. **Sem invenção**: nenhum número, prêmio, depoimento, cliente ou avaliação
   inventado. Conteúdo provisório sempre marcado para revisão.
