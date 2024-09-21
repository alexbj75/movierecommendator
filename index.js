/**
 * Express server that handles movie recommendation requests.
 * @module MovieRecommendationServer
 */

/**
 * Handles the POST request to get movie recommendations.
 * @function
 * @name getRecommendations
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with movie recommendations or an error message.
 */

/**
 * Starts the server on the specified port.
 * @function
 * @name startServer
 * @param {number} port - The port number to start the server on.
 * @returns {void}
 */
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;
const name = process.env.NAME || 'default_name';
const openaiKey = process.env.OPENAIKEY || 'default_openaikey';


app.use(express.json());
app.use(express.static('public')); // Serve HTML from the public folder

// OpenAI API request handler
/**
 * Handles the POST request to get movie recommendations.
 * @function
 * @name getRecommendations
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with movie recommendations or an error message.
 */
app.post('/get-recommendations', async (req, res) => {  
    const { title } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4", // You can use "gpt-4" if you have access to it
                messages: [
                    { role: "system", content: "You are a movie recommendation assistant." },
                    { role: "user", content: `Give me 1 movie recommendations similar to ${title} and 1 move recommendation that has the same feeling but different genre as ${title}.` }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        const data = await response.json();

        // Log the entire response object to see its structure
        console.log('OpenAI Response:', data);

        // Safely access message content from choices
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            const messageContent = data.choices[0].message.content;
            console.log('Message Content:', messageContent);

            res.json({ recommendations: messageContent.trim().split('\n') });
        } else {
            res.status(500).json({ error: 'No recommendations found in the response.' });
        }

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Error fetching recommendations' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
