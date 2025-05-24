import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateImage(prompt, size = '512x512') {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size,
    });

    const imageUrl = response.data.data[0].url;
    console.log('Image URL:', imageUrl);

    // Download and save the image
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.buffer();
    fs.writeFileSync('generated-image.png', buffer);
    console.log('Image saved as generated-image.png');
  } catch (error) {
    console.error('Error generating image:', error.response?.data || error.message);
  }
}

// Example call:
generateImage('A fantasy castle on a mountain at sunset');
