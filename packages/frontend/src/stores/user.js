import {writable} from "svelte/store";

const storedUser = localStorage.getItem('user');
export const user = writable(storedUser ? JSON.parse(storedUser) : '');

user.subscribe((value) => localStorage.user = JSON.stringify(value));
