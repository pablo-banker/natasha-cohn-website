import type { Testimonial } from '$lib/types';

/**
 * Depoimentos REAIS, transcritos na íntegra da página oficial
 * https://www.celebrantenatashacohn.com.br/depoimentos — sem editar o
 * sentido nem resumir. As fotos (uma por casal) ficam em
 * /static/images/depoimentos. Parágrafos separados por quebra de linha.
 *
 * `highlight` é uma frase real extraída do próprio depoimento, usada apenas
 * no carrossel da home (onde o texto aparece em fonte grande). A página de
 * depoimentos mostra sempre o texto completo.
 *
 * Nunca inventar nem alterar depoimentos.
 */
const dir = '/images/depoimentos';

export const testimonials: Testimonial[] = [
	{
		author: 'Luiza e Sergio',
		quote: `Net querida, tudo bem aqui, recuperando minha voz, meu joelho, meu corpo inteiro, mas foi incrível. Domingo foi um dia muito especial para a gente, desafiador de certas maneiras, pra gente repensar, né? Foi bom, foi muito bom assim. Até a questão da chuva fez com que eu e o Sergio a gente se conectasse com algo a mais, né? O que que era a celebração, esse mais foi que fez toda a diferença.

As pessoas perguntavam assim, quem é essa celebrante, ela é sua amiga? Como é que ela sabia tanto da história de vocês? Ela é maravilhosa mesmo!! Sério Nat, eu amei, amei, amei cada palavra que você disse, amei seu carinho com a gente. Foi tudo tão singelo, tão delicado, tão poético, que deixou todo mundo doido, ficou todo mundo amarradão.

Todo mundo dizendo: cara, foi a cerimônia mais linda que eu já fui na minha vida. O comentário foi geral, foi muito emocionante, foi uma das cerimônias mais bonitas que as pessoas já viram na vida. A gente ficou muito feliz com toda a condução, toda a sua delicadeza. Eu não quero esquecer nunca — de tempos em tempos a gente tem que reler o texto de tão especial que foi. Obrigada pelo seu carinho.`,
		image: `${dir}/luiza-sergio.avif`,
		imageAlt: 'Luiza e Sergio na cerimônia'
	},
	{
		author: 'Amanda e Luan',
		quote: `Celebração ÚNICA!!! A cerimônia perfeita.

O trabalho da Natasha está muito além da celebração de uma união. Natasha é de uma sensibilidade e entrega que cativa, encanta, une, emociona e faz sorrir. Seu trabalho é baseado no detalhe, na atenção, na conexão e na pluralidade — aquela essência que faz total diferença.

Nossa cerimônia foi tão incrível que os convidados acharam que éramos amigos, de tamanha essencialidade transbordada nas palavras.

Natasha, que Deus siga abençoando sua vida, seu trabalho, seus sonhos, para que você possa unir tantos casais com todo o amor que você emana nas suas palavras, na sua postura, na sua entonação e, principalmente, no brilho dos teus olhos!

Foi uma honra e uma benção pra nós sermos casados por você. Gratidão.`,
		highlight:
			'Natasha é de uma sensibilidade e entrega que cativa, encanta, une, emociona e faz sorrir.',
		featured: true,
		image: `${dir}/amanda-luan.avif`,
		imageAlt: 'Amanda e Luan na cerimônia'
	},
	{
		author: 'Camila e Nero',
		quote: `A Natasha tem o dom de transformar qualquer fato numa emocionante história, sabe usar as palavras como ninguém, tem uma voz doce que acalma e parece transbordar o tanto de amor que tem dentro de si.

Fez uma cerimônia linda, personalizada e inesquecível! Conseguiu expressar nossos sentimentos e contar nossa história melhor que nós mesmos. Não teve um convidado que não se emocionou. Ela conseguiu tocar todos que estavam ali. Até o meu marido, que nunca chora, chorou!

Foi lindo e ficará guardado nas nossas memórias pra sempre! Muito obrigada! Beijos.`,
		highlight: 'A Natasha tem o dom de transformar qualquer fato numa emocionante história.',
		featured: true,
		image: `${dir}/camila-nero.avif`,
		imageAlt: 'Camila e Nero na cerimônia'
	},
	{
		author: 'Mirella e Neto',
		quote: `A Nat foi uma das primeiras fornecedoras que contratamos para o nosso microwedding, que ocorreu em Búzios. Todas as conversas com ela foram maravilhosas e ela faz questão de sempre se inteirar de todo o processo (registro no cartório civil, roteiro da celebração...).

O rito do casamento foi perfeito. Ela colocou em palavras a nossa história de uma forma tão verdadeira, tão íntima, tão poética que é difícil encontrar mais elogios. Ao final da cerimônia, todos estavam em prantos e 3 pessoas da nossa família já queriam contratá-la para futuros casamentos, haha.

Muita gratidão por nossos caminhos terem se cruzado, Nat! Te desejamos toda a felicidade e sucesso que forem possíveis.`,
		highlight:
			'Ela colocou em palavras a nossa história de uma forma tão verdadeira, tão íntima, tão poética.',
		context: 'microwedding em Búzios',
		featured: true,
		image: `${dir}/mirella-neto.avif`,
		imageAlt: 'Mirella e Neto no microwedding em Búzios'
	},
	{
		author: 'Thássia e Paulo Vitor',
		quote: `As palavras da Natasha são mágicas.

Não tenho palavras para dizer o quanto eu e meu marido amamos a celebração. A Natasha conseguiu transformar em lindas palavras todos os nossos sentimentos, e conseguiu encantar e emocionar todos que estavam presentes.

As palavras dela são mágicas! Todos falaram que foi a celebração mais linda que eles já viram na vida!!!

Nós agradecemos de todo o coração, por todo o cuidado, amor e atenção! Todo sucesso do mundo!!`,
		highlight: 'As palavras da Natasha são mágicas.',
		featured: true,
		image: `${dir}/thassia-paulo.avif`,
		imageAlt: 'Thássia e Paulo Vitor na cerimônia'
	},
	{
		author: 'Sione e Mônica',
		quote: `A melhor celebrante que eu já conheci!

Nossa, viver esse dia foi realizar um sonho de conto de fadas, e você, com suas palavras, contou a nossa trajetória de 25 anos e emocionou todos os convidados. Para nós duas, a emoção de ver nosso amor contado nessa voz suave... só temos que dizer: obrigada, Natasha Cohn!

Já estamos contando os dias pra fazer a renovação dos nossos votos.`,
		highlight: 'A melhor celebrante que eu já conheci!',
		featured: true,
		image: `${dir}/sione-monica.avif`,
		imageAlt: 'Sione e Mônica na cerimônia'
	},
	{
		author: 'Josi e Bruno',
		quote: `A melhor celebrante para o melhor dia!

Passou 1 mês do dia mais especial da minha vida e do Bruno, e nós queremos te agradecer por ter feito daquele dia o mais bonito de todos. Obrigada pelas suas palavras, pela sua sensibilidade, pelo sorriso em toda a cerimônia, pelo carinho, paciência e, principalmente, por emanar todo o nosso amor a todos que estavam por lá.

A cerimônia foi emocionante e eletrizante. Eu e o Bruno amamos, e todos os convidados também. Não teve uma pessoa sequer que não tenha chorado, que não tenha se sentido tocada pelas suas palavras e pelo nosso amor. Foi só elogios por todos os lados, por onde quer que andemos até hoje.

Parabéns pelo seu talento, pela sua sensibilidade de saber traduzir o amor. Nosso muito obrigado por transformar o nosso casamento na mais linda lembrança. Beijos carinhosos.`,
		image: `${dir}/josi-bruno.avif`,
		imageAlt: 'Josi e Bruno na cerimônia'
	},
	{
		author: 'Lucas e Márcio',
		quote: `Natasha!!! Que dia lindo, que cerimônia linda! Todo mundo elogiando, vibrando, rindo com a gente.

Cada fotinha nova é um reviver de um dia ímpar — eu reconheço mais ainda a importância do nosso trabalho.`,
		image: `${dir}/lucas-marcio.avif`,
		imageAlt: 'Lucas e Márcio na cerimônia'
	},
	{
		author: 'Juliana e Fernanda',
		quote: `Ahhhh você é muito maravilhosa!!! Foi tudo tão lindo. Impossível esquecer suas palavras.

Você foi uma pessoa essencial para esse grande dia. Não teria sido mais perfeito, foi encantador! Tudo do jeitinho que a gente sonhou.

Muito obrigada por fazer do nosso dia o mais inesquecível.`,
		image: `${dir}/juliana-fernanda.avif`,
		imageAlt: 'Juliana e Fernanda na cerimônia'
	},
	{
		author: 'Aline e Aleff',
		quote: `Ah, a Natasha fez a nossa cerimônia emocionante, engraçada — e fez tudo isso através da nossa história!

Que sacada maravilhosa essa mulher tem: através de trechos de histórias contadas por nós, realizou uma cerimônia que foi elogiada por todos. Além da voz maravilhosa, uma voz doce, calma... ela é a perfeição!`,
		image: `${dir}/aline-aleff.avif`,
		imageAlt: 'Aline e Aleff na cerimônia'
	},
	{
		author: 'Weslley e Jonathan',
		quote: `Nossa experiência com a Natasha foi a melhor. Não imaginávamos que seria tão perfeito e surpreendente.

Além de ser ótima com as palavras, ela se envolve, ela participa, e quando fala parece que esteve a todo momento conosco durante toda a nossa trajetória até aquele momento tão especial. Profissional exemplar.

Se alguém tiver dúvidas sobre ter essa experiência, nós esperamos que esse depoimento traga essa certeza.`,
		image: `${dir}/weslley-jonathan.avif`,
		imageAlt: 'Weslley e Jonathan na cerimônia'
	},
	{
		author: 'Yara e Rhuan',
		quote: `Gente, que mulher incrível! Ela tem o dom da palavra — não teve uma pessoa que não chorou na cerimônia, kkkk.

Ela faz a cerimônia totalmente personalizada pra vocês e coloca cada detalhe da vida do casal de uma forma tão incrível, sem contar que a cerimônia não fica chata nem monótona, além de não durar horas. Todo mundo falando super bem, dizendo que foi uma das cerimônias mais lindas que já viram e que em nenhum momento ficou chata.

Podem confiar que ela é incrível e vai fazer tudo com todo carinho e amor do mundo! Gente, até ela se emocionou na cerimônia, kkkk. Ela é perfeita!`,
		image: `${dir}/yara-rhuan.avif`,
		imageAlt: 'Yara e Rhuan na cerimônia'
	},
	{
		author: 'Juliana e Marco',
		quote: `A melhor celebrante do mundo!

O meu contato com a Natasha foi realmente uma benção de Deus. Nos 10 meses de contato com ela, pude conhecer a sensibilidade, o carinho e o amor desse ser humano único e de muita luz.

Natasha, obrigada por cada palavra de amor, obrigada por transmitir a nossa história de uma forma tão simples e tão linda. Nossa cerimônia não teria sido tão perfeita sem você. Mil vezes obrigada.`,
		image: `${dir}/juliana-marco.avif`,
		imageAlt: 'Juliana e Marco na cerimônia'
	},
	{
		author: 'Jéssica e Alexandre',
		context: 'renovação de votos',
		quote: `Celebrante nota mil! Perfeita.

Pensem em uma celebrante perfeita, aquela que celebra um dos dias mais felizes das nossas vidas com todo carinho, cuidado e zelo. Essa pessoa se chama Natasha!

Realizamos nossa renovação de votos no último dia 29 de outubro e foi tudo perfeitamente maravilhoso. Cerimônia linda, celebrante nota mil. Muita gratidão!`,
		image: `${dir}/jessica-alexandre.avif`,
		imageAlt: 'Jéssica e Alexandre na renovação de votos'
	},
	{
		author: 'Jéssica e Alexandre',
		quote: `Natasha realmente foi um presente de Deus nas nossas vidas! Dois anos de antecedência para encontrá-la e esperar pelo grande dia! E como valeu a pena a espera, viu?!

Natasha conseguiu contar nossa história em uma cerimônia leve e muito divertida, transmitiu nossa essência sem ao menos nos conhecer pessoalmente! Que profissional!!! Só ouvimos elogios logo após a cerimônia, e até hoje pós-festa. Convidados e o noivo tímido, encantados e rendidos pela profissional!

Gratidão pelo nosso encontro e por tudo que fez por nós! Inesquecível!`,
		image: `${dir}/jessica-alexandre.avif`,
		imageAlt: 'Jéssica e Alexandre na cerimônia'
	},
	{
		author: 'Carolina e Wagner',
		quote: `Perfeita! Sem defeitos!

Com a correria eu não consegui te mandar mensagem antes, mas eu queria te agradecer muito pelas lindas palavras na cerimônia. Você foi perfeita em tudo e superou muito as nossas expectativas.

Todo mundo falou que chorou muito a cerimônia inteira, e eu nem sei expressar o quanto sou grata por ter te conhecido. Muito obrigada por tudo, Natasha. Vou levar você pra sempre no meu coração e em cada palavra linda que você nos entregou.`,
		image: `${dir}/carolina-wagner.avif`,
		imageAlt: 'Carolina e Wagner na cerimônia'
	}
];

/** Selecionados para o carrossel da home (usam o trecho curto `highlight`). */
export const featuredTestimonials = testimonials.filter((t) => t.featured);
