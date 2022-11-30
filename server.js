const express = require('express');
const app = express();

app.use(express.json());

const movies = [
  {
    id: 1,
    title: "SHREK 2",
    genre: "Bestseller",
    actors: [
        1,
        2,
    ]
  },
  {
    id: 2,
    title: "Mary a tout prix",
    genre: "Gel dans les cheveux",
    actors: [
        1,
        3,
    ]
  }
];

const actors = [
    {
        id: 1,
        name: "Diaz",
        first_name: "Cameron",
        nationality: "USA"
    },
    {
        id: 2,
        name: "Myers",
        first_name: "Mike",
        nationality: "CANADA"
    },
    {
        id: 3,
        name: "Stiller",
        first_name: "Ben",
        nationality: "USA"
    }
];

app.get('/api/movies', (req, res) => {
    movies.map(movie => {
        movie.actors = movie.actors.map(actorId => {
            return actors.find(actor => {
                return actor.id == actorId;
            });
        });
        return movie;
    })
    res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(movie => {
        return movie.id == req.params.id;
    });

    if (!movie) {
        res.status(404).json({error: "the movie with given id doesn't exist"});
    }

    movie.actors = movie.actors.map(actorId => {
        return actors.find(actor => {
            return actor.id == actorId;
        });
    });

    res.json(movie);
});

app.put('/api/movies', (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        actors: req.body.actors
    };
    movies.push(movie);
    res.status(201).json(movie);
});

app.patch('/api/movies/:id', (req, res) => {
    const movie = movies.find(movie => {
        return movie.id == req.params.id;
    });

    if (!movie) {
        res.status(404).json({error: "the movie with given id doesn't exist"});
    }

    movie.title = req.body.title || movie.title;
    movie.genre = req.body.genre || movie.genre;
    movie.actors = req.body.actors || movie.actors;

    res.status(202).json(movie);
});

app.delete('/api/movies/:id', (req, res) => {
    const index = movies.findIndex(movie => {
        return movie.id == req.params.id;
    });

    if (index == -1) {
        res.status(404).json({error: "the movie with given id doesn't exist"});
    }

    movies.splice(index, 1);
    res.status(204).json();
});



app.get('/api/actors', (req, res) => {
    res.json(actors);
});

app.get('/api/actors/:id', (req, res) => {
    const actor = actors.find(actor => {
        return actor.id == req.params.id;
    });

    if (!actor) {
        res.status(404).json({error: "the actor with given id doesn't exist"});
    }

    res.json(actor);
});

app.put('/api/actors', (req, res) => {
    const actor = {
        id: actors.length + 1,
        name: req.body.name,
        first_name: req.body.first_name,
        nationality: req.body.nationality
    };
    actors.push(actor);
    res.status(201).json(actor);
});

app.patch('/api/actors/:id', (req, res) => {
    const actor = actors.find(actor => {
        return actor.id == req.params.id;
    });

    if (!actor) {
        res.status(404).json({error: "the actor with given id doesn't exist"});
    }

    actor.name = req.body.name || actor.name;
    actor.first_name = req.body.first_name || actor.first_name;
    actor.nationality = req.body.nationality || actor.nationality;

    res.status(202).json(actor);
});

app.delete('/api/actors/:id', (req, res) => {
    const index = actors.findIndex(actor => {
        return actor.id == req.params.id;
    });

    if (index == -1) {
        res.status(404).json({error: "the actor with given id doesn't exist"});
    }

    actors.splice(index, 1);
    res.status(204).json();
});

app.listen(80, () => {
    console.log('up');
});