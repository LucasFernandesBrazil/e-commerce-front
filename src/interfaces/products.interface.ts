export interface IProducts {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

export interface IProductCheckout {
  productDetail: IProducts,
  color: string,
  quantity: number
}

export interface IProductDetail {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: IImage[];
  itens: IProductItem[];
}

export interface IImage {
  urlImagem: string;
  ordem: number;
}

export interface IProductItem {
  tamanho: string;
  cores: IColor[];
  estaDisponivel: boolean;
}

export interface IColor {
  id: number;
  nome: string;
  codigo: string;
  quantidadeEstoque: number;
  estaDisponivel: boolean;
}

export interface IColorCompact {
  nome: string;
  codigo: string;
}

export interface IProductShipping {
  idItem: number;
  idProduto: number;
  nome: string;
  precoTotal: number;
  precoUnitario: number;
  quantidade: number;
  tamanho: string;
  imagem: string;
  cor: IColorCompact;
}

export interface ICart {
  itens: IProductShipping[];
  precoTotal: number;
}
