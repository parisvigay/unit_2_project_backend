import 'dotenv/config'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express()


app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

mongoose.connect(`${process.env.DATABASE_URL}`)
const artistSchema = new mongoose.Schema({
    name: String,
    genre: String,
    active: Boolean,
    image: String
})

const songSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    title: String,
    year: String,
    genre: String
})

const albumSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    title: String,
    year: String,
    genre: String,
})

const Artist = mongoose.model('Artist', artistSchema) 
const Song = mongoose.model('Song', songSchema)
const Album = mongoose.model('Album', albumSchema)

app.post('/add/song', async (req, res) => {
    try {
        const data = req.body
        let artist = await Artist.findOne({ name: data.artist })
        if (!artist) {
            artist = new Artist({
                name: data.artist
            })
            await artist.save()
        }
        const song = new Song({
            artist: artist,
            title: data.title,
            year: data.year,
            genre: data.genre
        })
        await song.save()
        return res.status(200).json(song)
    } catch (err) {
        console.log(err);
    }
})

app.post('/add/artist', async (req, res) => {
    try {
        const data = req.body
        let artist = await Artist.findOne({ name: data.artist })
        if (!artist) {
            const artist = new Artist({
                name: data.name,
                genre: data.genre,
                active: data.active.toLowerCase() ==='yes'?true:false,
                image: data.image
            })
            await artist.save()
            return res.status(200).json(artist)
        }
        else {
            Artist.updateOne({ name: data.artist }, {
                genre: data.genre,
                active: data.active.toLowerCase() ==='yes'?true:false,
                image: data.image
            })
            return res.status(200).json(artist)
        }
    } catch (err) {
        console.log(err);
    }
})

app.post('/add/album', async (req, res) => {
    try {
        const data = req.body
        let artist = await Artist.findOne({ name: data.artist })
        if (!artist) {
            artist = new Artist({
                name: data.artist
            })
            await artist.save()
        }
        let album = await Album.findOne({ title: data.album })
        if (!album) {
            const album = new Album({
                artist: artist,
                title: data.title,
                year: data.year,
                genre: data.genre
            })
            await album.save()
            return res.status(200).json(album)
        }
    } catch (err) {
        console.log(err);
    }
})

app.get('/artists', async (req, res) => {
    const artists= await Artist.find({});
    res.status(200).json(artists)
})

app.get('/songs', async (req, res) => {
    const songs= await Song.find({});
    res.status(200).json(songs)
})

app.get('/albums', async (req, res) => {
    const albums= await Album.find({});
    res.status(200).json(albums)
})