import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DC299",
    paddingTop: 62,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#202C50",
  },
  descricao: {
    fontSize: 15,
    color: "#526078",
    marginTop: 8,
    marginBottom: 24,
  },
  secao: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202C50",
    marginBottom: 12,
  },
  form: {
    gap: 12,
    marginBottom: 32,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#526078",
  },
  filtros: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  busca: {
    gap: 12,
    marginBottom: 8,
  },
  contador: {
    fontSize: 14,
    color: "#526078",
    marginVertical: 16,
  },
  separador: {
    height: 12,
  },
  lista: {
    paddingBottom: 40,
  },
  vazio: {
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
    marginTop: 24,
  },
});