const fs = require('fs');
const axios = require('axios');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-2', // Fallback model
      prompt,
      n: 1,
      size: "512x512"
    });

    const imageUrl = response.data[0].url;
    console.log("Image URL:", imageUrl);

    const img = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync('ai-image.png', img.data);
    console.log('Image saved as ai-image.png');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

generateImage("A futuristic city at night with flying cars and neon lights");
