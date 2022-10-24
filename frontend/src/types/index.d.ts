export {};

declare global {
  interface Window {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    BlockpassKYCConnect: any; // 👈️ turn off type checking
    ethereum: any;
    web3: any;
  }
}
