const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Venue, Concert, VenueComment } = require("../../db/models");

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    let venues = await Venue.findAll()
    return res.json(venues)
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    let venueId = req.params.id
    const venue = await Venue.findByPk(Number(venueId))
    return res.json(venue)
}))

router.get('/:id(\\d+)/comments', asyncHandler(async (req, res) => {
    let venueId = req.params.id
    let venueComments = await VenueComment.findAll({ where: {venueId} })
    
    return res.json(venueComments)
}))

router.get('/:id(\\d+)/concerts', asyncHandler(async (req, res) => {
    let venueId = req.params
    let venueConcerts = await Concert.findAll({ where: venueId })
    return res.json(venueConcerts)
}))

router.post('/:id(\\d+)/comments', asyncHandler(async (req, res) => {
    const venueId = req.params
    const { userId, comment } = req.body
    commentSuccess = await VenueComment.create({ comment, userId, venueId })
    return res.json(commentSuccess)
}))

router.post('/:id(\\d+)/comments/:commentId(\\d+)', asyncHandler(async (req, res) => {
    const { venueId, commentId } = req.params
    const comment = VenueComment.findByPk(commentId)
    if (!comment) return res.json('Comment Doesnt Exist!')
    if (comment) {
        comment.destroy()
        return res.json('deleted')
    }
}))

module.exports = router