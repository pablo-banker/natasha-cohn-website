import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	timeout: 30_000,
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		// Muitos testes enviam o formulário; um limite alto evita o 429 do
		// rate limiter (produção mantém o padrão de 3). Sem GOOGLE_FORM_URL o
		// envio roda em modo desenvolvimento (nada é enviado de verdade).
		env: {
			CONTACT_RATE_LIMIT: '1000'
		}
	},
	use: {
		baseURL: 'http://localhost:4173',
		// A abertura da marca (BrandIntro) roda só na 1ª visita. Nos testes,
		// cada contexto é novo (= 1ª visita) e o overlay cobriria a home e
		// interceptaria cliques. Pré-semeamos a chave para tratá-los como
		// visitantes recorrentes — a home aparece imediatamente.
		storageState: {
			cookies: [],
			origins: [
				{
					origin: 'http://localhost:4173',
					localStorage: [{ name: 'natasha-intro-seen', value: '1' }]
				}
			]
		}
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } }
	]
});
