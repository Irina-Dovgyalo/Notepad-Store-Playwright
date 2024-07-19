export let apiToken: string;
export let apiCookie: string;

export function setApiToken(newValue: string): void {
  apiToken = newValue;
}

export function setApiCookie(newValue: string): void {
  apiCookie = newValue;
}
