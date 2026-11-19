import AsyncStorage from "@react-native-async-storage/async-storage";

import { Produto } from "@/types/Produtos";

const PRODUTOS_STORAGE_KEY = "@produtos:items";

async function get(): Promise<Produto[]> {
  try {
    const storage = await AsyncStorage.getItem(PRODUTOS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("PRODUTOS_GET: " + error);
  }
}

async function save(produtos: Produto[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PRODUTOS_STORAGE_KEY, JSON.stringify(produtos));
  } catch (error) {
    throw new Error("PRODUTOS_SAVE: " + error);
  }
}

async function add(novoProduto: Produto): Promise<Produto[]> {
  const produtos = await get();
  const produtosAtualizados = [...produtos, novoProduto];

  await save(produtosAtualizados);

  return produtosAtualizados;
}

async function remove(id: string): Promise<void> {
  const produtos = await get();
  const produtosAtualizados = produtos.filter((produto) => produto.id !== id);

  await save(produtosAtualizados);
}

export const produtosStorage = {
  get,
  add,
  remove,
};