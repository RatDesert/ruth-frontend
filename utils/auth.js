class Cookie {
  leeway = 5000;
  constructor(typeName) {
    this.typeName = typeName;
  }

  set expiration(value) {
    localStorage[this.typeName + 'Expiration'] = value;
  }

  get expiration() {
    return Date.parse(localStorage[this.typeName + 'Expiration']);
  }

  get timeout() {
    console.log(this.expiration);
    return this.expiration - new Date().getTime();
  }

  get valid() {
    console.log(this.timeout);
    return this.timeout > this.leeway;
  }
}

export const refreshCookie = new Cookie('refreshCookie');
export const accessCookie = new Cookie('accessCookie');
