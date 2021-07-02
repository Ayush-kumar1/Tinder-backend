import express from 'express';
import mongoose from 'mongoose';
import Cards from '../tinder-backend/dbCards.js'
import Cors from 'cors';

// password- 5ONx1m2ZK2hNn3Xf
const dbURL = `mongodb+srv://admin:5ONx1m2ZK2hNn3Xf@cluster0.yszxi.mongodb.net/tinderDB?retryWrites=true&w=majority`

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(Cors())

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res) => {


    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })

})

app.delete("/tinder/cards/:id", async(req, res) => {

    try {

        const del = await Cards.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(del)

    } catch (err) {
        res.status(500).send(err)
    }
})


app.get("/", (req, res) => res.status(200).send("Hello awesome programers"));

app.listen(port, () => console.log(`listening on port: ${port}`))