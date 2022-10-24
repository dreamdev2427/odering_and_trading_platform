import { Stos } from "../Schema";

// type Request = { hostname: string; session: { stoid: string | number } };
export default (stoid: number | string): Stos => {
  const config = (global as any).config;
  const stoID = Number(stoid);
  const stos: { [hostname: string]: Stos & { stoid: number } } = config.stos;
  const foundSto =
    Object.values(stos).find((sto) => sto.stoid === stoID) ??
    Object.values(stos)[0];
  if (!foundSto) throw new Error("Sto does not exist");
  return foundSto;
};

export const getSTOFromConfigByHostname = (hostname: number | string): Stos => {
  const config = (global as any).config;
  const stos: { [hostname: string]: Stos & { stoid: number } } = config.stos;
  const foundSto =
    Object.values(stos).find((sto) => sto.stolink === hostname) ??
    Object.values(stos)[0];
  if (!foundSto) throw new Error("Sto does not exist");
  return foundSto;
};
