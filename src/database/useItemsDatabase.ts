import { useSQLiteContext, type SQLiteBindParams } from "expo-sqlite";

export function useItemsDatabase() {
  const database = useSQLiteContext();

  async function addItem(name: string, description: string) {
    const statement = await database.prepareAsync(
      "INSERT INTO menuItems (name, description) VALUES ($name, $description);"
    );

    try {
      const result = await statement.executeAsync({
        $name: name,
        $description: description,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      console.log(error);
    }
  }

  return { addItem };
}
