export function a() {
	return 'this is a';
}

export function b() {
	return 'this is b';
}

export function c() {
	return 'this is c';
}

import { chunk } from "lodash";
console.log(chunk([1, 2, 3, 4, 5, 6, 7]), 2)
