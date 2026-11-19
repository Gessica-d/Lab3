import { Categoria } from "@/types/Categoria";

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  categoria: Categoria;
  quantidade: number;
  preco: number;
};