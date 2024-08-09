import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/players/playerAppByGroup";
import { playerGetByGroupAndTeam } from "@storage/players/playerGetGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PLayerStorageDTO";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/groups/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [team, setTeam] = useState("Time A");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPLayers] = useState<PlayerStorageDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const newPlayerInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        Alert.alert("Nova pessoa", "É necessário informar o nome da pessoa.");
      }

      const newPlayer = {
        name: newPlayerName,
        team,
      };

      await playerAddByGroup(newPlayer, group);

      newPlayerInputRef.current?.blur();

      setNewPlayerName("");
      fetchPlayersByTeams();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
        return;
      }

      console.log({ error });
      Alert.alert(
        "Nova pessoa",
        "Não foi possível adicionar uma nova pessoa ao grupo."
      );
    }
  }

  async function fetchPlayersByTeams() {
    try {
      setIsLoading(true);

      const players = await playerGetByGroupAndTeam(group, team);
      setPLayers(players);
    } catch (error) {
      console.log({ error });
      Alert.alert("Pessoas", "Não foi possível buscar as pessoas do time");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(group, playerName);
      fetchPlayersByTeams();
    } catch (error) {
      Alert.alert("Pessoa", "Não foi possivel remover pessoa.");
    }
  }

  async function removeGroup() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover Grupo", "Não foi possível remover grupo");
      console.log({ error });
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover", "Deseja remover um grupo", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => removeGroup(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeams();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <HighLight title={group} subtitle="Adicione a galera e separe o time" />

      <Form>
        <Input
          inputRef={newPlayerInputRef}
          placeholder="Nome da pessoa"
          value={newPlayerName}
          autoCorrect={false}
          onChangeText={(value) => setNewPlayerName(value)}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HeaderList>
            <FlatList
              data={["Time A", "Time B"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Filter
                  title={item}
                  isActive={team === item}
                  onPress={() => setTeam(item)}
                />
              )}
              horizontal
            />

            <NumberOfPlayers>{players.length}</NumberOfPlayers>
          </HeaderList>

          <FlatList
            data={players}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => handleRemovePlayer(item.name)}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Não há pessoas neste time." />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              {
                paddingBottom: 100,
              },
              players.length === 0 && { flex: 1 },
            ]}
          />
        </>
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
