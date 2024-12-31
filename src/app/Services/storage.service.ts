import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private cachedToken: string | null = null;
  private TOKEN_KEY = 'AUTH_TOKEN_KEY';

  setToken(token: string){
    if (!window) {
      return;
    }
    this.cachedToken = token;
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null | void{
    if (!window) {
      return;
    }
    if (!this.cachedToken) {
      this.cachedToken = window.localStorage.getItem(this.TOKEN_KEY);
    }
    return this.cachedToken;
  }

  clearToken(){
    if (!window) {
      return;
    }
    this.cachedToken = null;
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

  constructor() { }
}
