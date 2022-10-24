import { createHash } from 'crypto';

export class Hash {
  result: string = '';

  binResult: Buffer = Buffer.from(`${process.env.PASSWORD_SALT}`);

  // More entropy
  private front: boolean = true;

  constructor(input: string) {
    this.hash(input);
  }

  private hash0(str: string): string {
    return createHash('sha256').update(`${process.env.PASSWORD_SALT}${str}`).digest('hex');
  }

  private hash0bin(str: string): Buffer {
    return createHash('sha256').update(`${process.env.PASSWORD_SALT}${str}`).digest();
  }

  hash(input: string): Hash {
    this.result = this.front
      ? this.hash0(`${this.result}${input}`)
      : this.hash0(`${input}${this.result}`);
    this.binResult = this.front
      ? this.hash0bin(`${this.result}${input}`)
      : this.hash0bin(`${input}${this.result}`);

    this.front = !this.front;
    return this;
  }
}
