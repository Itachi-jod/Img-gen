const express = require('express');
const OpenAI = require('openai');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set this in Render's environment
});

app.use(express.json());

app.get('/generate', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });

    const imageUrl = response.data[0].url;
    res.json({ image: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
