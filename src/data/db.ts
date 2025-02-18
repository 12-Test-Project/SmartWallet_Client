import Dexie, { type EntityTable } from 'dexie';

interface User {
  id: number;
  name: string;
  age: number;
}

const db = new Dexie('UsersDatabase') as Dexie & {
  users: EntityTable<
    User,
    'id' // primary key "id" 
  >;
};

// Schema declaration:
db.version(1).stores({
  users: '++id, name, age' // primary key "id" 
});

export type { User };
export { db };