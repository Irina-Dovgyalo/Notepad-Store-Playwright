export let apiCsrfToken: string;
export let apiCookie: string;

export function setApiCsrfToken(newValue: string): void {
  apiCsrfToken = newValue;
}

export function setApiCookie(newValue: string): void {
  apiCookie = newValue;
}
