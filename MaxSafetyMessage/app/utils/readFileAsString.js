import * as FileSystem from "expo-file-system";

export  const readAsString = async (way) => {
    const result = await FileSystem.readAsStringAsync(way)
    return result
}