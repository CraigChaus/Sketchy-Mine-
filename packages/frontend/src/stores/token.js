import { writable } from "svelte/store";

const storedToken = localStorage.token;
export const token = writable(storedToken);

token.subscribe(value => localStorage.token = value);
