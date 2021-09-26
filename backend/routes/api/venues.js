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
    let venue = await Venue.findByPk(venueId)
    return res.json(venue)
}))

router.get('/:id(\\d+)/comments', asyncHandler(async (req, res) => {
    let venueId = req.params.id
    let venueComments = await VenueComment.findAll({ where: venueId })
    return res.json(venueComments)
}))

router.get('/:id(\\d+)/concerts', asyncHandler(async (req, res) => {
    let venueId = req.params.id
    let venueConcerts = await Concert.findAll({ where: venueId })
    return res.json(venueConcerts)
}))

module.exports = router