# Guia de animação

As animações reforçam a narrativa — nunca competem com ela. Tudo é
**progressive enhancement**: o conteúdo é renderizado no servidor e permanece
visível e utilizável sem JavaScript, e todo movimento respeita
`prefers-reduced-motion`.

## Princípios

1. **Nada essencial depende de JS.** As `actions` escondem o estado inicial de
   forma síncrona (style inline) só quando vão animar, e sempre restauram a
   visibilidade se o GSAP não carregar (fallback com timeout). Nenhum elemento
   é escondido por CSS à espera do GSAP.
2. **`prefers-reduced-motion`** desliga parallax, magnético, desenho de linha,
   contagem e revelações por movimento — restando, no máximo, aparição
   imediata. Efeitos de mouse também exigem **ponteiro fino** (`pointer: fine`).
3. **Só anima o barato:** `transform`, `opacity` e `clip-path` (com moderação).
   Nada que cause layout shift.
4. **Sem sequestro de scroll**, sem prender o usuário, sem animações longas
   antes de o conteúdo ser acessível.
5. **Limpeza rigorosa:** toda action usa `gsap.context()` e reverte/mata os
   ScrollTriggers e listeners no `destroy`, evitando vazamentos.

## Carregamento do GSAP

`src/lib/animations/gsap.ts` faz `import()` dinâmico do GSAP + ScrollTrigger e
registra o plugin uma única vez. Resultado: o GSAP fica em **chunks próprios**
(verificado no build e por teste E2E — não está no HTML inicial) e só é baixado
quando uma animação precisa dele.

## Helpers reutilizáveis (`src/lib/animations/`)

| Arquivo       | Export        | O que faz                                                                            | Onde é usado          |
| ------------- | ------------- | ------------------------------------------------------------------------------------ | --------------------- |
| `reveal.ts`   | `reveal`      | revela um elemento (ou filhos, em cascata) ao entrar na viewport                     | quase todas as seções |
| `text.ts`     | `revealLines` | revela títulos **linha a linha** com máscara (SplitText, `aria:'auto'`, `autoSplit`) | hero, intros de seção |
| `parallax.ts` | `parallax`    | deslocamento sutil vinculado ao scroll (scrub)                                       | retrato, fotos        |
| `magnetic.ts` | `magnetic`    | botão que segue o cursor discretamente (ponteiro fino)                               | CTAs principais       |
| `scroll.ts`   | `drawLine`    | desenha um traço SVG conforme o scroll                                               | linha do processo     |
| `scroll.ts`   | `countUp`     | conta de 0 até o número (valor final já no SSR)                                      | estatísticas          |
| `scroll.ts`   | `maskReveal`  | revela imagem por `clip-path`                                                        | `ImageFrame`          |

Uso típico:

```svelte
<h2 use:revealLines={{ onScroll: true }}>Título</h2>
<p use:reveal={{ y: 20, delay: 0.1 }}>Texto</p>
<div use:reveal={{ stagger: '.item', staggerAmount: 0.1 }}>…</div>
<button use:magnetic={{ enabled: true, strength: 8 }}>CTA</button>
```

## Sequência da hero

Cada peça é independente e degrada sozinha, nesta ordem:

`eyebrow` → `título` (linha a linha) → `texto` → `botões` → `retrato` (máscara)
→ `detalhe editorial` → `autoridade` (por último).

## Efeitos de mouse (só desktop, ponteiro fino)

- **Parallax** no retrato e em fotos.
- **Botão magnético** (deslocamento máximo baixo).
- **Preview que segue o cursor** na lista de cerimônias (`CeremonyList`).

Todos verificam `pointerMotionAllowed()` (`utils/motion.ts`) e são desligados
em toque e com reduced-motion.

## Pseudo-elementos (`::before` / `::after`)

Decoração feita sem elementos HTML vazios: aspas dos depoimentos, molduras do
retrato e do CTA final, fundos que sobem no hover das cerimônias, grafismos dos
ritos (círculo/fio/arco), sublinhados animados (`.link-underline`). Todos usam
as cores reais da marca.

## Transições de página

`+layout.svelte` usa a **View Transitions API** (fade curto) com fallback: sem
suporte ou com reduced-motion, a navegação é instantânea — sem tela de
carregamento artificial. Após navegar, `ScrollTrigger.refresh()` recalcula as
posições.

## Ao adicionar uma animação nova

- Prefira um helper existente. Se criar um, siga o mesmo padrão: checar
  reduced-motion, esconder de forma síncrona só se for animar, ter fallback,
  usar `gsap.context()` e limpar no `destroy`.
- Nunca anime `width/height/top/left/box-shadow` pesados.
- Teste com reduced-motion ligado e com JS desligado.
