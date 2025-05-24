const fs = require('fs');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(prompt) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data.data[0].url;
    console.log("Image URL:", imageUrl);

    const img = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync('ai-image.png', img.data);
    console.log('Image saved as ai-image.png');
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

generateImage("A futuristic city skyline at night with glowing neon lights");
