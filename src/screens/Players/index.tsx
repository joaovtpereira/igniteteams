import { Header } from "@components/Header";
import { Container, Content } from "./styles";
import { HighLight } from "@components/HighLight";

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <HighLight
        title="Nome da turma"
        subtitle="Adicione a galera e separe o time"
      />

      <Content></Content>
    </Container>
  );
}
