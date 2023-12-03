import { IColorCompact } from "./products.interface";

export interface IRequests {
  dataPedido: string;
  itens: IProductItem[];
  precoTotal: number;
}

export interface IProductItem {
  id: number;
  cor: IColorCompact;
  imagem: string;
  precoTotal: number;
  precoUnitarioItem: number;
  quantidadeItem: number;
  tamanho: string;
  nome: string;
}