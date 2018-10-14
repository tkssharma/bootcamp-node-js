const mongoose = require('mongoose');
const User = require('../models/User');

const dbName = 'lab-express-cinema';
mongoose.connect(`mongodb://localhost/${dbName}`);

/* Aquí vamos a requerir el mongoose, en donde tengo el modelo y la base de datos que creo */

const users = [{
        user: "tks",
        password: "tks"
    }
];

User.collection.drop();

User.create(users, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${users.length} User`)
    mongoose.connection.close()
})


/* Para que se cree esta base de datos tengo que poner en terminal, en otra terminal:
node ./bin/seeds.js. De esta manera se crea la base de datos */