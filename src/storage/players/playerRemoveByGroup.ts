import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PLayerStorageDTO";
import { playerGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(group: string, playerName: string) {
  try {
    const storage = await playerGetByGroup(group);

    const filtered: PlayerStorageDTO[] = storage.filter(
      (player) => player.name !== playerName
    );

    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(players)
    );
  } catch (error) {
    throw error;
  }
}
