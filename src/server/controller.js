const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

const baseUrl = "https://api.meaningcloud.com/sentiment-2.1";
const APIKEY = process.env.APIKEY;

analyzeURLController = async (req, res) => {
    const reqBlogurl = req.body.url;
    try{
        const nlp_response_obj = await fetch(`${baseUrl}?key=${APIKEY}&of=json&model=general&lang=auto&url=${reqBlogurl}`, {
            method: 'GET',
        });
        const nlp_response_payload = await nlp_response_obj.json();
        if('status' in nlp_response_payload){
            if(nlp_response_payload['status']=='0'){
                return res.send({
                    text: nlp_response_payload.sentence_list[0].text,
                    score_tag : nlp_response_payload.score_tag,
                    agreement : nlp_response_payload.agreement,
                    subjectivity : nlp_response_payload.subjectivity,
                    confidence : nlp_response_payload.confidence
                });
            } else if(nlp_response_payload['status']=='212'){
                return res.send({
                    status: "failed",
                    reason: `${nlp_response_payload['msg']}`
                })
            }
        } else {
            return res.send({
                status: "failed",
                reason: 'Seems server has some issues'
            })
        }
    } catch(error){
        console.log(`error: ${error}`);
        return res.send({
            status: "failed",
            reason: 'Seems server has some issues'
        })
    }
}

module.exports = {
    analyzeURL: analyzeURLController,
}