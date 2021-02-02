const express = require('express');
const config = require('config');
const validUrl = require('valid-url');
const shortid = require('shortid');
const router = express.Router();
const Url = require('../models/Url');

// @route POST /api/url/shorten
// @desc  its a url shortener
router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body;
    const baseUrl = config.get('baseUrl');
    console.log(longUrl)
    console.log(baseUrl)

    //check Base Url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('invalid base Url');
    }
    //Create UrlCode
    const urlCode = shortid.generate();

    //check long Url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl})
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + "/" + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: Date.now()
                });
                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("Server Error")
        }
    } else {
        res.status(401).json("Invalid Long Url")

    }
});

router.post('/test', (req, res) => {
    console.log(req)
    res.json(req.body);
});

module.exports = router;