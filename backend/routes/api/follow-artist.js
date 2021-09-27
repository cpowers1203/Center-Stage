const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Artist, Concert, FollowArtist } = require("../../db/models");

const router = express.Router();

router.post('/:id(\\d+)', asyncHandler(async (req, res) => {
    let artistId = req.params.id
    const {userId} = req.body
    let response = await FollowArtist.findOne({
        where: {artistId, userId}
    })
    return res.json({userId, artistId})
}))

module.exports = router