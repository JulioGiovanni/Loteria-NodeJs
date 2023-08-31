import { createConnection } from 'mysql';
import { promisify } from 'util';

const dbConfig = {
  host: 'localhost',
  user: 'admin',
  password: '',
  database: 'loteria_db',
};

const connection = createConnection(dbConfig);
const query = promisify(connection.query).bind(connection);

async function generateLoteriaTables(numTables) {
  const availableCardIds = []; // To keep track of available card IDs

  try {
    // Fetch all card IDs from the database
    const cards = await query('SELECT id FROM cartas');
    for (const card of cards) {
      availableCardIds.push(card.id);
    }

    for (let i = 0; i < numTables; i++) {
      const selectedCardIds = [];

      // Randomly select 16 card IDs for the current table
      while (selectedCardIds.length < 16) {
        const randomIndex = Math.floor(
          Math.random() * availableCardIds.length
        );
        const selectedCardId = availableCardIds.splice(
          randomIndex,
          1
        )[0];
        selectedCardIds.push(selectedCardId);
      }

      // Check if a table with the same cards exists
      const existingTable = await query(
        'SELECT tabla_id FROM cartas_tablas WHERE carta_id IN (?) GROUP BY tabla_id HAVING COUNT(*) = ?',
        [selectedCardIds, selectedCardIds.length]
      );

      if (existingTable.length > 0) {
        console.log(
          `Table with the same cards already exists. Skipping table ${
            i + 1
          }.`
        );
        continue;
      }

      // Insert a new table into the 'tablas' table
      const insertTableResult = await query(
        'INSERT INTO tablas (nombre) VALUES (?)',
        [`Tabla ${i + 1}`]
      );
      const tablaId = insertTableResult.insertId;

      // Insert the selected card IDs and the corresponding table ID into the 'cartas_tablas' table
      for (const cardId of selectedCardIds) {
        await query(
          'INSERT INTO cartas_tablas (carta_id, tabla_id) VALUES (?, ?)',
          [cardId, tablaId]
        );
      }
    }

    console.log(
      `${numTables} lotería tables generated successfully.`
    );
  } catch (error) {
    console.error('Error generating lotería tables:', error);
  } finally {
    connection.end();
  }
}

function main() {
  const numTablesToGenerate = 5; // You can adjust this number as needed
  generateLoteriaTables(numTablesToGenerate);
}

main();
