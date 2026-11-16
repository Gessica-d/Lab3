import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { api } from "@/services/api";
import { Deputado } from "@/types/Deputado";

import { styles } from "./styles";

export default function Deputados() {
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("Toque no botão para consultar a API.");
  const [deputados, setDeputados] = useState<Deputado[]>([]);

  async function consultarDeputados() {
    setCarregando(true);
    setMensagem("Consultando a API...");

    try {
      const resposta = await api.get<{ dados: Deputado[] }>("/deputados");

      setDeputados(resposta.data.dados);
      setMensagem(`Consulta concluída: ${resposta.data.dados.length} deputados recebidos.`);
    } catch {
      setMensagem("Não foi possível consultar a API. Verifique a conexão e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>Deputados</Text>
      <Text style={styles.descricao}>Consulta à API da Câmara dos Deputados</Text>

      <Button
        title={carregando ? "Consultando..." : "Consultar API"}
        onPress={consultarDeputados}
        disabled={carregando}
      />

      <Text style={styles.mensagem}>{mensagem}</Text>

      <FlatList
        data={deputados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Card data={item} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}