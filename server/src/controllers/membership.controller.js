const httpStatus = require('http-status');
const { pick } = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { membershipService } = require('../services');

const createMembership = catchAsync(async (req, res) => {
    //const membership = { msg: 'POST endpoint OK' }
    const membership = await membershipService.createMembership(req.body);
    res.status(httpStatus.CREATED).send(membership);
})

const getAllMembers = catchAsync(async (req, res) => {
    // const result = { msg: 'GET endpoint OK' }
    const result = await membershipService.getAllMembers();
    res.send(result);
})

module.exports = {
    createMembership,
    getAllMembers
}