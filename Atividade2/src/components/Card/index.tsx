import { View, Image, Text } from "react-native";

import { Deputado } from "@/types/Deputado";

import { styles } from "./styles";

type Props = {
  data: Deputado;
};

export function Card({ data }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.urlFoto }} style={styles.foto} />

      <View style={styles.info}>
        <Text style={styles.nome}>{data.nome}</Text>
        <Text style={styles.detalhe}>
          {data.siglaPartido} - {data.siglaUf}
        </Text>
      </View>
    </View>
  );
}