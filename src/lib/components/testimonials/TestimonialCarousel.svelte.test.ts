import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import TestimonialCarousel from './TestimonialCarousel.svelte';

const testimonials = [
	{ author: 'Amanda e Luan', quote: 'Celebração ÚNICA!!!' },
	{ author: 'Thais e Yuri', quote: 'Uma de nossas melhores escolhas!' },
	{ author: 'Camila e Nero', quote: 'A Natasha tem o dom de transformar qualquer fato.' }
];

describe('TestimonialCarousel', () => {
	it('anuncia-se como carrossel e mostra o primeiro depoimento', () => {
		render(TestimonialCarousel, { props: { testimonials } });
		const group = screen.getByRole('group', { name: 'Depoimentos de casais' });
		expect(group).toHaveAttribute('aria-roledescription', 'carrossel');
		expect(screen.getByText('Celebração ÚNICA!!!')).toBeInTheDocument();
	});

	it('avança e volta pelos controles', async () => {
		const user = userEvent.setup();
		render(TestimonialCarousel, { props: { testimonials } });

		await user.click(screen.getByRole('button', { name: 'Próximo depoimento' }));
		expect(screen.getByText('Uma de nossas melhores escolhas!')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Depoimento anterior' }));
		expect(screen.getByText('Celebração ÚNICA!!!')).toBeInTheDocument();
	});

	it('circula do primeiro para o último ao voltar', async () => {
		const user = userEvent.setup();
		render(TestimonialCarousel, { props: { testimonials } });

		await user.click(screen.getByRole('button', { name: 'Depoimento anterior' }));
		expect(
			screen.getByText('A Natasha tem o dom de transformar qualquer fato.')
		).toBeInTheDocument();
	});

	it('navega direto por um ponto, identificando o casal', async () => {
		const user = userEvent.setup();
		render(TestimonialCarousel, { props: { testimonials } });

		await user.click(screen.getByRole('button', { name: /Ir para o depoimento 3: Camila e Nero/ }));
		expect(
			screen.getByText('A Natasha tem o dom de transformar qualquer fato.')
		).toBeInTheDocument();
	});

	it('permite pausar e retomar a passagem automática', async () => {
		const user = userEvent.setup();
		render(TestimonialCarousel, { props: { testimonials } });

		await user.click(screen.getByRole('button', { name: 'Pausar a passagem automática' }));
		expect(
			screen.getByRole('button', { name: 'Retomar a passagem automática' })
		).toBeInTheDocument();
	});

	it('informa a posição atual para leitores de tela', () => {
		render(TestimonialCarousel, { props: { testimonials } });
		expect(screen.getByText('Depoimento 1 de 3')).toBeInTheDocument();
	});
});
