var express = require('express');
var router = express.Router();
const {threads} = require("betabotz-tools")
const axios = require('axios');
const https = require('https');
const api = "https://api.threadsphotodownloader.com/v2/media";
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get("/download", async (req, res) => {
//     try {
//         const {url} = req.query;
//         console.log(url)
//
//         const result = await threads(url)
//         console.log(result)
//
//         const media = result.result
//         console.log("media ne: ", media)
//
//         const mediaImg = result.result.image_urls
//         const mediaVideo = result.result.video_urls
//         console.log("Video ne: ", typeof mediaVideo)
//         console.log("Video ne: ", mediaVideo)
//
//         res.json({
//             mediaImg,
//             mediaVideo
//         })
//
//     } catch (e) {
//         res.status(500).json({
//             status: 500,
//             msg: "Internal server error"
//         });
//         console.log(e)
//     }
// })

router.get("/download", async (req, res) => {
    try {
        const {url} = req.query;
        console.log(url);

        const header = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Origin': 'https://sssthreads.pro',
            'Referer': 'https://sssthreads.pro/',
            'Sec-CH-UA': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'Sec-CH-UA-Mobile': '?0',
            'Sec-CH-UA-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            'Priority': 'u=1, i'
        };

        const agent = new https.Agent({
            keepAlive: true,
            rejectUnauthorized: false, // Không khuyến khích dùng trong môi trường sản xuất
            secureOptions: require('constants').SSL_OP_LEGACY_SERVER_CONNECT
        });
        const response = await axios.get(api, {
            headers: header,
            params: {url},
            httpsAgent: agent

        });

        console.log(response.data);

        // Gửi phản hồi lại cho client
        res.status(200).json(response.data);

    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: "Lỗi máy chủ nội bộ"
        });
        console.log(e);
    }
});
module.exports = router;
