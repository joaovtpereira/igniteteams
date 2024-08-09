import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PLayerStorageDTO";
import { playerGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playerGetByGroup(group);
    const playerAlreadyExists =
      storedPlayers.filter((player) => player.name === newPlayer.name).length >
      0;

    if (playerAlreadyExists) {
      throw new AppError("Já existe um jogador cadastrado com esse nome.");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(storage)
    );
  } catch (error) {
    throw error;
  }
}
