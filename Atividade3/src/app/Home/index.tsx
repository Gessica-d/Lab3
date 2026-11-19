import { useState, useEffect } from "react";
import { View, Text, FlatList, Alert } from "react-native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { produtosStorage } from "@/storage/produtosStorage";
import { Categoria } from "@/types/Categoria";
import { Produto } from "@/types/Produtos";

import { styles } from "./styles";

const CATEGORIAS: Categoria[] = [
  Categoria.ALIMENTOS,
  Categoria.BEBIDAS,
  Categoria.LIMPEZA,
  Categoria.HIGIENE,
];

export default function Home() {
  // cadastros (AsyncStorage)
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoriaForm, setCategoriaForm] = useState<Categoria | null>(null);

  // Busca e filtro da lista
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria | null>(null);

  async function carregarProdutos() {
    try {
      const response = await produtosStorage.get();
      setProdutos(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  }

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setPreco("");
    setQuantidade("");
    setCategoriaForm(null);
  }

  async function handleAdd() {
    if (!nome.trim()) {
      return Alert.alert("Nome", "Informe o nome do produto.");
    }

    if (categoriaForm === null) {
      return Alert.alert("Categoria", "Selecione a categoria do produto.");
    }

    const quantidadeNumero = Number(quantidade);

    if (
      quantidade.trim() === "" ||
      !Number.isInteger(quantidadeNumero) ||
      quantidadeNumero < 0
    ) {
      return Alert.alert(
        "Quantidade",
        "Informe uma quantidade válida (número inteiro igual ou maior que zero)."
      );
    }

    const precoNumero = Number(preco.replace(",", "."));

    if (preco.trim() === "" || Number.isNaN(precoNumero) || precoNumero < 0) {
      return Alert.alert("Preço", "Informe um preço válido (zero ou maior).");
    }

    const novoProduto: Produto = {
      id: Math.random().toString(36).substring(2),
      nome: nome.trim(),
      descricao: descricao.trim(),
      categoria: categoriaForm,
      quantidade: quantidadeNumero,
      preco: precoNumero,
    };

    try {
      await produtosStorage.add(novoProduto);
      await carregarProdutos();
      limparFormulario();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível cadastrar o produto.");
    }
  }

  async function confirmarRemocao(id: string) {
    try {
      await produtosStorage.remove(id);
      await carregarProdutos();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover o produto.");
    }
  }

  function handleRemove(id: string) {
    Alert.alert("Remover", "Deseja remover este produto?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => confirmarRemocao(id) },
    ]);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(
    (produto) =>
      (categoriaFiltro === null || produto.categoria === categoriaFiltro) &&
      produto.nome.toLowerCase().includes(busca.trim().toLowerCase())
  );

  const cabecalho = (
    <View>
      <Text style={styles.titulo}>Produtos</Text>
      <Text style={styles.descricao}>Cadastre e consulte o estoque</Text>

      <Text style={styles.secao}>Novo produto</Text>

      <View style={styles.form}>
        <Input
          placeholder="Nome do produto *"
          value={nome}
          onChangeText={(value) => setNome(value)}
        />

        <Input
          placeholder="Descrição (opcional)"
          value={descricao}
          onChangeText={(value) => setDescricao(value)}
        />

        <Input
          placeholder="Preço (ex.: 12,50) *"
          keyboardType="decimal-pad"
          value={preco}
          onChangeText={(value) => setPreco(value)}
        />

        <Input
          placeholder="Quantidade *"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={(value) => setQuantidade(value)}
        />

        <Text style={styles.rotulo}>Categoria *</Text>
        <View style={styles.filtros}>
          {CATEGORIAS.map((item) => (
            <Filter
              key={item}
              title={item}
              isActive={categoriaForm === item}
              onPress={() => setCategoriaForm(item)}
            />
          ))}
        </View>

        <Button title="Cadastrar" onPress={handleAdd} />
      </View>

      <Text style={styles.secao}>Consultar produtos</Text>

      <View style={styles.busca}>
        <Input
          placeholder="Buscar produto pelo nome"
          value={busca}
          onChangeText={(value) => setBusca(value)}
        />

        <View style={styles.filtros}>
          <Filter
            title="Todos"
            isActive={categoriaFiltro === null}
            onPress={() => setCategoriaFiltro(null)}
          />

          {CATEGORIAS.map((item) => (
            <Filter
              key={item}
              title={item}
              isActive={categoriaFiltro === item}
              onPress={() => setCategoriaFiltro(item)}
            />
          ))}
        </View>
      </View>

      <Text style={styles.contador}>
        {produtosFiltrados.length} produto(s) encontrado(s)
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card data={item} onRemove={() => handleRemove(item.id)} />
        )}
        ListHeaderComponent={cabecalho}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListEmptyComponent={() => (
          <Text style={styles.vazio}>
            {produtos.length === 0
              ? "Nenhum produto cadastrado."
              : "Nenhum produto encontrado para a busca."}
          </Text>
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}