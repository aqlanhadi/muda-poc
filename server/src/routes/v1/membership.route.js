const express = require('express')

const membershipController = require('../../controllers/membership.controller')

const router = express.Router()

router.route('/')
    .post(membershipController.createMembership)
    .get(membershipController.getAllMembers)

module.exports = router