const router = require('express').Router();
const userModel = require('../../Model/User/User');
const Formidable = require('formidable');
const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { response } = require('express');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});


router.post('/api/user-register', async(request, response) => {
    const form = new Formidable.IncomingForm();
    form.parse(request, async(error, fields, files) => {
        const { username, password, verifiedPassword } = fields;
        const { profileImage } = files

        if (!username || !password || !verifiedPassword || !profileImage) {
            return response.status(400).json({ msg: 'All fields are required' })
        };

        const user = await userModel.findOne({ username: username })
        if (user) {
            return response.status(400).json({ msg: 'This user already exists' })
        }

        cloudinary.uploader.upload(profileImage.path, { folder: '/Tweeter-two/profiles' }, async(error, res) => {
            if (error) {
                return console.log(error);
            }
            const profileImage_url = res.secure_url;

            const salt = await Bcrypt.genSalt(15);
            const hashedPassword = await Bcrypt.hash(password, salt)
            const newUser = new userModel({
                username,
                password: hashedPassword,
                profile_pic: profileImage_url,
            })
            const savedUser = await newUser.save()

            const token = JWT.sign({ id: savedUser._id }, process.env.jwt_secret);
            return response
                .status(201)
                .json({ token: token, profile_pic: savedUser.profile_pic, });
        });
    });
});

router.post('/api/user-login', async(request, resonse) => {
    const form = new Formidable.IncomingForm();
    form.json.parse(request, async(error, fields, files) => {
        const { username, password } = fields;
        if (!username || !password) {
            return response.status(400).json({ msg: 'All fields are required' })
        }
        const user = await userModel.findOne({ username: username })
        if (!user) {
            return response.status(400).json({ msg: 'This user does not exist' })
        }
        const validatedPassword = await Bcrypt.compare(password, user.password);
        if (validatedPassword) {
            return response.status(400).json({ msg: 'Invalid Creds!' });
        }
        const token = JWT.sign({ id: user._id }, process.env.jwt_secret);
        return response
            .status(200)
            .json({ token: token, profile_pic: user.profile_pic });
    });
});

module.exports = router;