import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonPath = join(__dirname, '../fixtures/db.json');

const defaultData = {};

export const db = new Low(new JSONFile(jsonPath), defaultData);

export const initDatabase = async () => {
    try {
        await db.read();
    } catch (error) {
        console.error('Error reading the database file:', error.message);
    }

    if (!db.data) {
        console.log('Initializing default data...');
        db.data = defaultData;
        await db.write();
    }
    return db;
};

