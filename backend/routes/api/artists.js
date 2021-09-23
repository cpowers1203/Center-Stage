const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Artist, Concert } = require("../../db/models");

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    let artists = await Artist.findAll()
    return res.json(artists)
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    let artistId = req.params.id
    let artist = await Artist.findByPk(artistId, { include: Concert })
    return res.json(artist)
}))


module.exports = router