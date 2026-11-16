import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  foto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E4E6EC",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202C50",
  },
  detalhe: {
    fontSize: 14,
    color: "#526078",
    marginTop: 4,
  },
});