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
    const venueId = req.params.id
    const { userId, comment } = req.body
    console.log(venueId, "I AM THE VENUE")
    const commentSuccess = await VenueComment.create({ comment: comment.commentBody, userId, venueId })
    return res.json(commentSuccess)
}))

router.put('/:id(\\d+)/comments/:commentId(\\d+)', asyncHandler(async (req, res) => {
    const {id: venueId, commentId} = req.params
    const { comment } = req.body
    const prevComment = await VenueComment.findByPk(commentId)
    if (prevComment) {
        updateSuccess = await prevComment.update({ venueId, comment })
        return res.json(updateSuccess)
    }
}))

router.post('/:id(\\d+)/comments/:commentId(\\d+)', asyncHandler(async (req, res) => {
    const { id: commentId, venueId: id } = req.params
    const comment = await VenueComment.findByPk(commentId)
    if (!comment) return res.json('Comment Doesnt Exist!')
    if (comment) {
        comment.destroy()
        return res.json('deleted')
    }
}))

module.exports = router