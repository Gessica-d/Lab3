import { View, Text, TouchableOpacity } from "react-native";

import { Produto } from "@/types/Produtos";

import { styles } from "./styles";

type Props = {
  data: Produto;
  onRemove: () => void;
};

export function Card({ data, onRemove }: Props) {
  const semEstoque = data.quantidade === 0;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.nome}>{data.nome}</Text>
        <Text style={styles.categoria}>{data.categoria}</Text>

        {data.descricao ? (
          <Text style={styles.descricao}>{data.descricao}</Text>
        ) : null}
      </View>

      <View style={styles.detalhes}>
        <View>
          <Text style={styles.preco}>
            R$ {data.preco.toFixed(2).replace(".", ",")}
          </Text>
          <Text
            style={[
              styles.quantidade,
              { color: semEstoque ? "#D32F2F" : "#526078" },
            ]}
          >
            {semEstoque ? "Sem estoque" : `Qtd: ${data.quantidade}`}
          </Text>
        </View>

        <TouchableOpacity style={styles.remover} onPress={onRemove}>
          <Text style={styles.removerTexto}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}