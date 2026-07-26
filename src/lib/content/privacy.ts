import { site } from './site';

/**
 * Política de privacidade (LGPD — Lei 13.709/2018).
 *
 * IMPORTANTE: este texto é um ponto de partida honesto e alinhado ao que o
 * site realmente faz. Antes da publicação, peça a revisão de um advogado e
 * complete os dados do controlador (razão social / CPF ou CNPJ), que não
 * devem ser inventados. Ver docs/MIGRATION.md.
 */
export const privacy = {
	title: 'Política de privacidade',
	updatedAt: '2026-07-23',
	intro: `Esta política explica quais dados pessoais são coletados neste site, para que servem e quais são os seus direitos, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).`,
	sections: [
		{
			title: 'Quem é responsável pelos seus dados',
			body: [
				`O tratamento dos dados coletados neste site é de responsabilidade de ${site.legalName}. Para qualquer assunto relacionado a esta política, o contato é ${site.email}.`,
				'DADO PENDENTE: incluir aqui a identificação completa do controlador (CPF ou CNPJ e endereço), conforme orientação jurídica.'
			]
		},
		{
			title: 'Quais dados são coletados',
			body: [
				'Dados que você envia pelo formulário de contato: nome do casal, e-mail, WhatsApp e as informações que você optar por preencher sobre a celebração (data, cidade e local, tipo de cerimônia, número aproximado de convidados, idioma desejado, como conheceu meu trabalho) e a mensagem escrita por você.',
				'Este site não utiliza ferramentas de análise (analytics) nem coleta dados de navegação para rastreamento. Só recebo o que você mesmo enviar pelo formulário.'
			]
		},
		{
			title: 'Por que os dados são usados',
			body: [
				'Os dados do formulário são usados exclusivamente para responder ao seu contato e conversar sobre a cerimônia de vocês. A base legal é o seu consentimento e os procedimentos preliminares a um contrato.'
			]
		},
		{
			title: 'Com quem os dados são compartilhados',
			body: [
				'Seus dados não são vendidos nem cedidos a terceiros para fins comerciais. As respostas do formulário são registradas no Google Forms (Google), que atua como operador; além disso, os dados podem transitar pelo serviço de hospedagem do site. Ambos são estritamente necessários ao funcionamento do formulário.'
			]
		},
		{
			title: 'Por quanto tempo os dados são guardados',
			body: [
				'As mensagens do formulário são mantidas pelo tempo necessário ao atendimento e, quando houver contratação, pelo prazo exigido pela legislação aplicável. Você pode pedir a exclusão a qualquer momento.'
			]
		},
		{
			title: 'Seus direitos',
			body: [
				'Você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou desatualizados, a anonimização ou eliminação de dados desnecessários, a portabilidade, a informação sobre compartilhamentos e a revogação do consentimento.',
				`Para exercer qualquer um desses direitos, escreva para ${site.email}.`
			]
		},
		{
			title: 'Cookies',
			body: [
				'Este site não utiliza cookies de rastreamento, análise ou publicidade. Guardamos apenas uma preferência funcional (o idioma escolhido) no seu próprio navegador (localStorage), que não identifica você. Você pode limpar os dados do site no navegador a qualquer momento.'
			]
		},
		{
			title: 'Segurança',
			body: [
				'São adotadas medidas técnicas razoáveis para proteger os dados enviados, incluindo conexão criptografada (HTTPS) e validação das informações no servidor. Nenhum sistema é totalmente infalível, mas o compromisso é tratar os seus dados com o mesmo cuidado com que trato as histórias que me confiam.'
			]
		},
		{
			title: 'Alterações desta política',
			body: [
				'Esta política pode ser atualizada. A data da última atualização está indicada no topo da página.'
			]
		}
	]
};
