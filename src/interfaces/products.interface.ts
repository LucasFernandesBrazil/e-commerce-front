export interface IProducts {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
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
