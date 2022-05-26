const httpStatus = require('http-status');
const { Member } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a member
 */
const createMembership = async (memberBody) => {
    return Member.create(memberBody);
}

const getAllMembers = async (filter, options) => {
    const members = await Member.find()
    return members;
}

module.exports = {
    createMembership,
    getAllMembers
}