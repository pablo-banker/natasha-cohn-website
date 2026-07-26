import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Button from './Button.svelte';

const label = (text: string) => createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));

describe('Button', () => {
	it('renderiza como <button> por padrão', () => {
		render(Button, { props: { children: label('Enviar') } });
		const button = screen.getByRole('button', { name: 'Enviar' });
		expect(button.tagName).toBe('BUTTON');
		expect(button).toHaveAttribute('type', 'button');
	});

	it('renderiza como link quando recebe href', () => {
		render(Button, { props: { children: label('Cerimônias'), href: '/cerimonias' } });
		const link = screen.getByRole('link', { name: 'Cerimônias' });
		expect(link).toHaveAttribute('href', '/cerimonias');
	});

	it('links externos abrem em nova aba com rel seguro', () => {
		render(Button, {
			props: { children: label('WhatsApp'), href: 'https://wa.me/55', external: true }
		});
		const link = screen.getByRole('link', { name: 'WhatsApp' });
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('fica desabilitado e anuncia carregamento no estado loading', () => {
		render(Button, { props: { children: label('Enviando'), loading: true } });
		const button = screen.getByRole('button', { name: /Enviando/ });
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');
	});

	it('respeita o type submit', () => {
		render(Button, { props: { children: label('Enviar'), type: 'submit' } });
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});
});
