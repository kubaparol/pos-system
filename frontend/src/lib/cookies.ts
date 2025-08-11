import Cookies, { type Cookie, type CookieSetOptions } from 'universal-cookie';

export class CookieService {
  client: Cookies;
  key: string;

  constructor(name: string) {
    this.client = new Cookies();
    this.key = name;
  }

  set(value: Cookie, options?: CookieSetOptions) {
    this.client.set(this.key, value, { path: '/', ...options });
  }

  delete(options?: CookieSetOptions) {
    this.client.remove(this.key, { path: '/', ...options });
  }

  get() {
    return this.client.get(this.key);
  }
}

export const accessTokenCookie = new CookieService('pos-system-access-token');
