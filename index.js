import express from 'express';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let animeData = []
let nextId = 1

// ADD NEW DATA
app.post('/animes', (req, res) => {
    const { name, rank } = req.body
    const newAnime = { id: nextId++, name, rank }
    animeData.push(newAnime)
    res.status(201).send(newAnime);
});

// GET ALL DATA
app.get('/animes', (req, res) => {
    res.status(200).send(animeData);
});

// GET DATA WITH ID
app.get('/animes/:id', (req, res) => {
   const anime = animeData.find(anime => anime.id === parseInt(req.params.id));
   if(!anime)
    return res.status(404).send({ message: 'Anime not found' });
   res.status(200).send(anime);
});

// UPDATE DATA
app.put('/animes/:id',(req,res)=>{
    const anime = animeData.find(anime => anime.id === parseInt(req.params.id));
    if(!anime)
    return res.status(404).send({ message: 'Tea not found' });

    const { name, rank } = req.body;
    anime.name = name;
    anime.rank = rank;
    res.status(200).send(anime);
})

// DELETE DATA

app.delete('/animes/:id', (req, res) => {
    const index = animeData.findIndex(anime => anime.id === parseInt(req.params.id));
    if(index === -1)
    return res.status(404).send({ message: 'Anime not found' });

    animeData.splice(index, 1);
    res.status(200).send('deleted');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
