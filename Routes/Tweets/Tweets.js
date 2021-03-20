const router = require('express').Router();
const tweetModel = require('../../Model/Tweets/Tweets');
const userModel = require('../../Model/User/User');
const cloudinary = require('cloudinary').v2;
const JWT = require('jsonwebtoken');
const Formidable = require('formidable')
require('dotenv').config();


router.post('/api/tweet-upload', async(request, response) => {
    const token = request.header('x-auth-token');
    const verifiedToken = JWT.verify(token, process.env.jwt_secret);

    const user_id = verifiedToken.id;

    const user = await userModel.findOne({ _id: user_id });
    console.log(user);
    const form = new Formidable.IncomingForm();

    form.json.parse(request, async(error, fields, files) => {
        const { tweet } = fields;
        const { file } = files;

        if (!file) {
            const newTweet = new tweetModel({
                user: user.username,
                tweet: tweet,
                profile: user.profile_pic,
            });

            const savedTweet = await newTweet.save();
        } else {
            cloudinary.uploader.upload(file.path, { folder: '/TWEETS/FILES' }, async(error, res) => {
                if (error) {
                    console.log(error);
                }
                const file_url = res.secure_url

                const newTweet = new tweetModel({
                    user: user.username,
                    tweet: tweet,
                    profile: user.profile_pic,
                    file: file_url
                });

                const savedTweet = await newTweet.save();
            });
        }
        return response.status(200).json({ msg: 'TWEET SENT!' })
    });
});

router.get('/api/feeds', async(request, response) => {
    await tweetModel.find().exec().then((data) => {
            return response.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post('/api/likes/:id', async(request, response) => {
    const tweet_id = await tweetModel.findOne({ _id: tweet_id })

    tweet.likes += 1;

    const updateDocument = await tweetModel.findOneAndUpdate({ _id: tweet_id }, tweet, {
        new: true,
    });
    return response.status(201).json.parse({ msg: "Liked tweet" });
});

router.post("/api/comments/:id", async(request, response) => {
    const tweet_id = await tweetModel.findOne({ _id: tweet_id });

    const form = new Formidable.IncomingForm();
    form.parse(request, async(error, fields, files) => {
        const { comment } = fields;

        tweet.comments = [...tweet.comments, comment];

        const updateDocument = await tweetModel.findOneAndUpdate({ _id: tweet_id }, tweet, { new: true });
    })

    return response.status(201).json.parse({ msg: "Liked comment" });
});

module.exports = router;