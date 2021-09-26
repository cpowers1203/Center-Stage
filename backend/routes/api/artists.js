const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Artist, Concert, FollowArtist } = require("../../db/models");

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    let artists = await Artist.findAll()
    return res.json(artists)
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    let artistId = req.params.id
    let artist = await Artist.findByPk(artistId, {include: [{ model: Concert }, {model: FollowArtist}]})
    return res.json(artist)
}))

router.post('/:id(\\d+)/follow', asyncHandler(async (req, res) => {
    let artistId = req.params.id
    const {userId} = req.body
    let followingArtist = await FollowArtist.findOne({
        where: {artistId, userId}
    })
    if (!followingArtist) {
        followSuccess = await FollowArtist.create({ artistId, userId })
        return res.json(followSuccess)
    }
}))

router.post('/:id(\\d+)/unfollow', asyncHandler(async (req, res) => {
    let artistId = req.params.id
    const {userId} = req.body
    let followingArtist = await FollowArtist.findAll({
        where: {artistId, userId}
    })
    if (followingArtist.length) {
        followingArtist.forEach(element => {
             element.destroy()
        });
        
    }
}))
module.exports = router