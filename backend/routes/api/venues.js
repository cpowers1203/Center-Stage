const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Venue, Concert } = require("../../db/models");

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    let venues = await Venue.findAll()
    return res.json({venues})
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    let venueId = req.params.id
    let venue = await Venue.findByPk(venueId, { include: Concert })
    return res.json(venue)
}))