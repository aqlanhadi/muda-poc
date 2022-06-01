const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('./plugins')

const GeoSchema = new mongoose.Schema(
    {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    }
)

const addressSchema = mongoose.Schema(
    {
        streetNumber: String,
        route: String,
        sublocality: String,
        locality: String,
        postal_code: Number,
        administrative_area_level_1: String,
        country: String,
        loc: GeoSchema,
        addressObject: Object
    }
)

const memberSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            }
        },
        ic: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate(value) {
                if (!validator.isNumeric(value)) {
                    throw new Error('Invalid IC');
                }
            }
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate(value) {
                if (!validator.isNumeric(value)) {
                    throw new Error('Invalid phone');
                }
            }
        },
        votingAddress: {
            type: addressSchema,
            required: true,
        },
        homeAddress: {
            type: addressSchema,
            required: true,
        },
        votingIsSameAsHome: {
            type: Boolean,
            required: true,
        },
        declaration: {
            type: Boolean,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

memberSchema.plugin(toJSON)
memberSchema.plugin(paginate)

/**
 * @typedef Member
 */
const Member = mongoose.model('Member', memberSchema)

module.exports = Member