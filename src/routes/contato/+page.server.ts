import type { Actions } from './$types';
import { handleContact } from '$lib/server/contactAction';

export const actions: Actions = {
	default: handleContact
};
