import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PLayerStorageDTO";
import { playerGetByGroup } from "./playersGetByGroup";

export async function playerGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playerGetByGroup(group);

    const players: PlayerStorageDTO[] = storage.filter(
      (player) => player.team === team
    );
    return players;
  } catch (error) {
    throw error;
  }
}
