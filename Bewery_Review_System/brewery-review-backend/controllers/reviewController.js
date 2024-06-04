const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel.js");
const { BadRequestError } = require("../middlewares/errors.js");

exports.addReview = async (req, res) => {
    const { brewerId, review } = req.body;

    if (!brewerId || !review) throw new BadRequestError("Kindly Enter all values");

    try {
        await Review.create({
            brewerId,
            review,
            uid: req.userId,
        });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error!" });
    }
    res.status(StatusCodes.CREATED).json({ msg: "success" });
};

exports.getReview = async (req, res) => {
    const { brewerId } = req.params;
    const reviews = await Review.find({ brewerId });
    res.status(StatusCodes.OK).json({ data: reviews });
};
