import sqlite3 from "sqlite3";
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id integer PRIMARY KEY, username text UNIQUE, password text UNIQUE, city text, state text, zipcode text, interest_peanut_allergy boolean, interest_egg_allergy boolean, interest_dairy_allergy boolean, is_admin boolean DEFAULT false)");
    db.run("insert into users (id, username, password, zipcode, city, interest_dairy_allergy, interest_egg_allergy, interest_peanut_allergy, is_admin) values (1,'admin', 'password', 36043, 'Camisano Vicentino', true, true, true, true),(2, 'Luca Biasiolo','password2',36047,'Montegalda', false, false, false, false)");

    db.run("create table restaurants (id integer primary key, name text unique, zipcode text, state text, city text, overall_score real, peanuts_score real, egg_score real, dairy_score real)")
    db.run("insert into restaurants (id, name, state, city, zipcode) values (1,'La Moma', 'Italy', 'Camisano Vicentino', 36043),(2, 'La Pizzeria', 'Italy', 'Montegalda', 36047),(3, 'La Trattoria', 'Italy', 'Gazzo', 36050),(4, 'La Vecchia fornace', 'Italy', 'Vicenza', 36100),(5, 'Passando per Modena', 'Italy', 'Vicenza', 36100),(6, 'Red Quill', 'Italy', 'Marola',36098)")
});

export default db;