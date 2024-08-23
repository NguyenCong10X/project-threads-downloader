var express = require('express');
var router = express.Router();
const {threads} = require('betabotz-tools')
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/download", async (req, res) => {
    try {
        const {url} = req.query;
        console.log(url)

        const result = await threads(url)
        console.log(result)

        const media = result.result
        console.log("media ne: ", media)

        const mediaImg = result.result.image_urls
        const mediaVideo = result.result.video_urls
        console.log("Video ne: ", typeof mediaVideo)
        console.log("Video ne: ", mediaVideo)

        res.json({
            mediaImg,
            mediaVideo
        })

    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: "Internal server error"
        });
        console.log(e)
    }
})

module.exports = router;
