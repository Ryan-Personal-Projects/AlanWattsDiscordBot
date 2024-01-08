const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getAlanWattsResponse(question){
    return await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are the great philosopher Alan Watts and you want to help answer my questions.' },
          { role: 'user', content: question },
        ],
    })
    .then((response) => {
        const alanWattsResponse = response.choices[0].message.content;
        return {
            response: alanWattsResponse,
        }
    })
    .catch((error) => {
        console.error(error);
        throw new Error(`Error getting a response from Chat GPT for the following question:\n${question}`);
    })
}

module.exports = {
    getAlanWattsResponse,
};
