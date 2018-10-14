const mongoose = require('mongoose');
const movieScreens = require('../models/movieScreens');

const dbName = 'lab-express-cinema';
mongoose.connect(`mongodb://localhost/${dbName}`);

/* Aquí vamos a requerir el mongoose, en donde tengo el modelo y la base de datos que creo */

const moviesscreens = [{
        name: "Mall De Goa",
        location: "Near Rajiv Chowk Delhi",
        description: "Following the discovery of a new form of space travel as well as Meg's father's disappearance, she, her brother, and her friend must join three magical beings - Mrs. Whatsit, Mrs. Who, and Mrs. Which - to travel across the universe to rescue him from a terrible evil.",
        availability: ["13:00", "15:30", "18:00", "20:10", "22:40"]
    },
    {
      name: "Mall De Goa",
      location: "Near Rajiv Chowk Delhi",
      description: "Following the discovery of a new form of space travel as well as Meg's father's disappearance, she, her brother, and her friend must join three magical beings - Mrs. Whatsit, Mrs. Who, and Mrs. Which - to travel across the universe to rescue him from a terrible evil.",
      availability: ["13:00", "15:30", "18:00", "20:10", "22:40"]
  },
  {
    name: "Mall De Goa",
    location: "Near Rajiv Chowk Delhi",
    description: "Following the discovery of a new form of space travel as well as Meg's father's disappearance, she, her brother, and her friend must join three magical beings - Mrs. Whatsit, Mrs. Who, and Mrs. Which - to travel across the universe to rescue him from a terrible evil.",
    availability: ["13:00", "15:30", "18:00", "20:10", "22:40"]
},
{
  name: "Mall De Goa",
  location: "Near Rajiv Chowk Delhi",
  description: "Following the discovery of a new form of space travel as well as Meg's father's disappearance, she, her brother, and her friend must join three magical beings - Mrs. Whatsit, Mrs. Who, and Mrs. Which - to travel across the universe to rescue him from a terrible evil.",
  availability: ["13:00", "15:30", "18:00", "20:10", "22:40"]
}
];

movieScreens.collection.drop();
movieScreens.create(moviesscreens, (err) => {
    if (err) {
        throw (err)
    }
    console.log(`Created ${moviesscreens.length} movies`)
    mongoose.connection.close()
})


/* Para que se cree esta base de datos tengo que poner en terminal, en otra terminal:
node ./bin/seeds.js. De esta manera se crea la base de datos */