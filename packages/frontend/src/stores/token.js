import { writable } from 'svelte-local-storage-store';

export const token = writable('token', '');
