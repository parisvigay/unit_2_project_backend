import 'dotenv/config'
import express, {Router} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express()
const router = Router()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})


mongoose.connect(`${process.env.DATABASE_URL}`)

//add content
const artistSchema = new mongoose.Schema({
    name: String,
    genre: String,
    active: String,
    image: String,
    isArtist: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

router.post('/add/artist', async (req, res) => {
    try {
        const data = req.body
        let findUser = await User.findOne({ 'emailAddress': data.emailAddress })
        let artist = await Artist.findOne({ name: data.artist })
        if (!artist) {
            const artist = new Artist({
                name: data.name,
                genre: data.genre,
                active: data.active,
                image: data.image,
                isArtist: true,
                user: findUser._id
            })
            await artist.save()
            return res.status(200).json(artist)
        }
        else {
            Artist.updateOne({ name: data.artist }, {
                genre: data.genre,
                active: data.active,
                image: data.image
            })
            return res.status(200).json(artist)
        }
    } catch (err) {
        console.log(err);
    }
})


const songSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    title: String,
    year: String,
    genre: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

router.post('/add/song', async (req, res) => {
    try {
        const data = req.body
        let findUser = await User.findOne({ 'emailAddress': data.emailAddress })
        let artist = await Artist.findOne({ name: data.artist })
        if (!artist) {
            artist = new Artist({
                name: data.artist,
                isArtist: false
            })
            await artist.save()
        }
        const song = new Song({
            artist: artist,
            title: data.title,
            year: data.year,
            genre: data.genre,
            user: findUser._id
        })
        await song.save()
        return res.status(200).json(song)
    } catch (err) {
        console.log(err);
    }
})


const albumSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    title: String,
    year: String,
    genre: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

router.post('/add/album', async (req, res) => {
    try {
        const data = req.body
        let findUser = await User.findOne({ 'emailAddress': data.emailAddress })
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
                genre: data.genre,
                user: findUser._id
            })
            await album.save()
            return res.status(200).json(album)
        }
    } catch (err) {
        console.log(err);
    }
})

//users
const userSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true },
    lastLogin: { type: Date, required: true }
})

router.post('/add/user', async (req, res) => {
    console.log(req.body);
    try {
      const now = new Date();
      const existingUser = await User.findOne({ emailAddress: req.body.emailAddress });
  
      if (!existingUser) {
        const newUser = new User({ emailAddress: req.body.emailAddress, lastLogin: now });
        await newUser.save();
        return res.status(200).json(newUser);
      } else {
        existingUser.lastLogin = now; // Update the lastLogin field
        await existingUser.save();
        return res.status(200).json(existingUser);
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//favourites
const favouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    song: String,
    artist: String,
    album: String
});


router.post('/add/favourite', async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ emailAddress: data.emailAddress });
        const favourite = new Favourite({
            user: user._id,
            song: data.song,
            artist: data.artist,
            album: data.album
        });
        await favourite.save();
        return res.status(200).json(favourite);
    } catch (err) {
        console.log(err);
    }
});

router.get('/favourites', async (req, res) => {
    const userEmail = req.query.emailAddress;
    try {
        const user = await User.findOne({ emailAddress: userEmail });
        const userFavourites = await Favourite
            .find({ user: user._id }) // favourites corresponding only to the current user
            .sort({ _id: -1 }) // Sort by most recently added
            .limit(1); // limit it to only 1
        res.status(200).json(userFavourites);
    } catch (err) {
        console.error(err);
    }
});

// Endpoint to retrieve all favorites
router.get('/all-favourites', async (req, res) => {
    try {
        const allFavorites = await Favourite.find({}).populate('user');
        res.status(200).json(allFavorites);
    } catch (err) {
        console.error(err);
    }
});

router.put('/favourites/:id', async (req, res) => {
    const id = req.params.id;
    const favourite = await Favourite.findById(id);
    favourite.set(req.body)
    await favourite.save()
    return res.status(200).json(favourite)
})

//models
const Artist = mongoose.model('Artist', artistSchema) 
const Song = mongoose.model('Song', songSchema)
const Album = mongoose.model('Album', albumSchema)
const User = mongoose.model('User', userSchema)
const Favourite = mongoose.model('Favourite', favouriteSchema)


router.get('/artists', async (req, res) => {
    const artists= await Artist.find({}).populate('user');
    res.status(200).json(artists)
})

router.delete('/delete-artists/:id', async (req, res) => {
    const artistId = req.params.id;
  
    try {
      const deletedArtist = await Artist.findByIdAndRemove(artistId);
  
      if (deletedArtist) {
      return res.status(204).send();
      }
    } catch (error) {
      console.error(error);
    }
  });

router.get('/songs', async (req, res) => {
    const songs= await Song.find({}).populate('artist').populate('user').populate('user', 'emailAddress');
    res.status(200).json(songs)
})

router.delete('/delete-song/:id', async (req, res) => {
    const songId = req.params.id;
    try {
      const deletedSong = await Song.findByIdAndRemove(songId);
      if (deletedSong) {
      return res.status(204).send();
      }
    } catch (error) {
      console.error(error);
    }

  });

router.get('/albums', async (req, res) => {
    const albums= await Album.find({}).populate('artist').populate('user');
    res.status(200).json(albums)
})

router.delete('/delete-album/:id', async (req, res) => {
    const albumId = req.params.id;
  
    try {
      const deletedAlbum = await Album.findByIdAndRemove(albumId);
  
      if (deletedAlbum) {
      return res.status(204).send();
      }
    } catch (error) {
      console.error(error);
    }
  });

app.use("/", router)