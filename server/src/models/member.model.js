const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('./plugins')

const GeoSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
)

const addressSchema = mongoose.Schema(
    {
        houseNumber: String,
        street: String,
        street2: String,
        city: String,
        postcode: Number,
        state: String,
        country: String,
        loc: GeoSchema
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
        residentialAddress: {
            type: addressSchema,
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