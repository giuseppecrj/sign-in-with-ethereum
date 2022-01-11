export class User {
    address: string;
    nonce: number;

    constructor(address: string) {
        this.address = address
        this.nonce = Math.floor(Math.random() * 10000000)
    }
}

export const users: User[] = [];
