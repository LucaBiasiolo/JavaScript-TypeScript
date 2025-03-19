import sqlite3 from "sqlite3";
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id integer PRIMARY KEY, name text)");

    const stmt = db.prepare("INSERT INTO users (id, name) VALUES (1, 'admin'), (2, 'Luca Biasiolo')");
    stmt.run();
    stmt.finalize();
});

export default db;