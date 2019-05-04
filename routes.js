const express = require('express');
const router = express.Router();

const favoriteSongs = [];

router.get('/getAllFavorites', (req, res, next) => {
	res.json({favorites: favoriteSongs});
});

router.post('/addToFavorites',  (req, res) => {
    if(req.body && req.body.song){
        const song = req.body.song;
        if(getSongIndexInList(song) === -1){
            favoriteSongs.push(song);
            res.status(200).send({song: song}); 
        }
        else{
            res.status(400).send("Song is already in list");
        }
    }
    else{
        res.status(404).send("Data missing in body of post request");
    }
});

router.post('/removeFromFavorites',  (req, res) => {
    if(req.body && req.body.song){
        const song = req.body.song;
        const songIndex = getSongIndexInList(song);
        if(songIndex > -1){
            favoriteSongs.splice(songIndex, 1);
            res.status(200).send({song: song}); 
        }
        else{
            res.status(400).send("Cannot find song in list" );
        }
    }
    else{
        res.status(404).send("Data missing in body of post request");
    }
});

const getSongIndexInList = songObj => {
    const songLink = songObj._linkUrl;
    const songIndexInList = favoriteSongs.findIndex(song => song._linkUrl === songLink);
    return songIndexInList;
}

module.exports = router;