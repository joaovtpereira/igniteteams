import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { HighLight } from "@components/HighLight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/groups/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState("");

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        throw new AppError("É necessário informar um nome para o grupo.");
      }
      await groupCreate(group);
      navigation.navigate("players", {
        group,
      });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo grupo: ", error.message);
        return;
      }
      Alert.alert("Novo grupo: ", "Não foi possível criar um novo grupo");
      console.log(error);
    }
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <HighLight
          title="Cria a turma"
          subtitle="Cria a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
