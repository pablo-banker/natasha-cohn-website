import type { Actions } from './$types';
import { handleContact } from '$lib/server/contactAction';

// O formulário da home usa a mesma lógica validada da página /contato.
export const actions: Actions = {
	default: handleContact
};
