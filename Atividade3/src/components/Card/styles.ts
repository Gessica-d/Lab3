import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202C50",
  },
  categoria: {
    fontSize: 13,
    fontWeight: "600",
    color: "#51c585",
    marginTop: 4,
  },
  descricao: {
    fontSize: 13,
    color: "#526078",
    marginTop: 4,
  },
  detalhes: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  preco: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202C50",
  },
  quantidade: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
  remover: {
    marginTop: 12,
  },
  removerTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D32F2F",
  },
});