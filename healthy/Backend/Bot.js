// Bot.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Add this at the very top

const API_KEY = process.env.VITE_GEMINI_API_KEY;

// Rest of your code remains the same
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user', // System instructions are typically provided under the 'user' role for Gemini
            parts: [{ 
              text: `You are a helpful and knowledgeable medical assistant. Your primary function is to provide general, educational information about health, medical conditions, and wellness.

              You MUST adhere to the following strict rules:
 -Provide factual information about symptoms, conditions, and treatments from verified sources.
 -Answer in 100 words and keep to the point.
 -Answer to the point.
 -Share evidence-based prevention tips (vaccination info, hygiene practices).
 -Provide FDA-approved drug information (mechanism, common side effects)
 -Never conclude what condition a user has and Avoid suggesting specific medications/therapies ,Cannot analyze lab results or imaging findings.
 -Must redirect to human professionals for emergencies give amubulance number and Avoid "you" statements about care.
 -Give only indian emergency number,whenever its sounds serious or asked for ` 
 
            }]
          },
          {
            role: 'user',
            parts: [
              {
                text: userMessage
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7, // Controls creativity of the response
          maxOutputTokens: 200 // Optional: Limit response length to prevent rambling
        }
      })
    });

    // Check if the HTTP response itself indicates an error (e.g., 4xx or 5xx status)
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({ message: 'No error details provided by Gemini' }));
      console.error(`Gemini API error: Status ${response.status}. Details:`, JSON.stringify(errorDetails, null, 2));
      return res.status(response.status).json({ 
        reply: `Failed to get reply from Gemini API. Status: ${response.status}. Error: ${errorDetails.message || 'Unknown API error.'}` 
      });
    }

    const data = await response.json();

    // Debug: show the full successful Gemini API response
    console.log('Gemini API response:', JSON.stringify(data, null, 2));

    // Extract the bot's reply from the Gemini API response structure
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply from Gemini API (content field missing).";
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Error communicating with Gemini API (network/server issue):', error);
    res.status(500).json({ reply: 'Failed to get reply from Gemini API due to a network error or internal server issue.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});