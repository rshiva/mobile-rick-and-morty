import * as SQLite from 'expo-sqlite';

async function openDatabase() {
  return await SQLite.openDatabaseAsync("rickandmorty.db");
}

export async function createCharacterTable() {
  const db = await openDatabase();
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER UNIQUE,
        name TEXT,
        species TEXT,
        gender TEXT,
        origin_location TEXT,
        current_location TEXT,
        image TEXT
      )`
    );
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  } finally {
    await db.closeAsync();
  }
}

export async function writeCharacter(character) {
  const db = await openDatabase();
  try {
    const result = await db.runAsync(
      `INSERT OR REPLACE INTO characters (character_id, name, species, gender, origin_location, current_location, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [character.id, character.name, character.species, character.gender, character.origin.name, character.location.name, character.image]
    );
    console.log('Character inserted with ID:', result.character_id);
    return result.insertId;
  } catch (error) {
    console.error('Error inserting character:', error);
    throw error;
  } finally {
    await db.closeAsync();
  }
}

export async function fetchAllCharacters() {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync('SELECT * FROM characters order by id desc ');
    console.log("Fetched data:", result);
    return result;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  } finally {
    // await db.closeAsync();
  }
}

export async function deleteCharacter(id) {
  const db = await openDatabase();
  try {
    await db.runAsync('DELETE FROM characters WHERE character_id = ?', [id]);
    console.log('Character deleted');
  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  } finally {
    await db.closeAsync();
  }
}