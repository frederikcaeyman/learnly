const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Learnly Backend is running!' });
});

// PDF Upload and Text Extraction
app.post('/api/upload-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    console.log('Processing PDF...');
    
    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;

    console.log(`Extracted ${extractedText.length} characters from PDF`);

    res.json({
      success: true,
      text: extractedText,
      pages: pdfData.numpages,
      info: pdfData.info
    });

  } catch (error) {
    console.error('PDF processing error:', error);
    res.status(500).json({ 
      error: 'Failed to process PDF',
      details: error.message 
    });
  }
});

// Generate Flashcards
app.post('/api/generate-flashcards', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Text is too short. Please provide at least 50 characters.' 
      });
    }

    console.log('Generating flashcards...');

    const prompt = `
Analyseer de volgende cursustekst en maak 6-8 flashcards in het Nederlands. 
Elke flashcard moet een vraag (q) en antwoord (a) hebben.
Focus op de belangrijkste concepten, definities en feiten.

Cursustekst:
${text.substring(0, 3000)}

Geef je antwoord in dit exacte JSON formaat:
{
  "flashcards": [
    {
      "q": "Vraag hier",
      "a": "Antwoord hier"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    const response = completion.choices[0].message.content;
    
    try {
      const parsedResponse = JSON.parse(response);
      res.json({
        success: true,
        flashcards: parsedResponse.flashcards
      });
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: 'AI returned invalid format'
      });
    }

  } catch (error) {
    console.error('Flashcard generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate flashcards',
      details: error.message 
    });
  }
});

// Generate Quiz
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Text is too short. Please provide at least 50 characters.' 
      });
    }

    console.log('Generating quiz...');

    const prompt = `
Analyseer de volgende cursustekst en maak een quiz van 4-6 meerkeuzevragen in het Nederlands.
Elke vraag moet 4 antwoordmogelijkheden hebben met 1 correct antwoord.

Cursustekst:
${text.substring(0, 3000)}

Geef je antwoord in dit exacte JSON formaat:
{
  "quiz": [
    {
      "q": "Vraag hier?",
      "opts": ["Optie 1", "Optie 2", "Optie 3", "Optie 4"],
      "correct": 0
    }
  ]
}

De "correct" waarde is de index (0-3) van het juiste antwoord in de opts array.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0].message.content;
    
    try {
      const parsedResponse = JSON.parse(response);
      res.json({
        success: true,
        quiz: parsedResponse.quiz
      });
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: 'AI returned invalid format'
      });
    }

  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      details: error.message 
    });
  }
});

// Generate Summary
app.post('/api/generate-summary', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Text is too short. Please provide at least 50 characters.' 
      });
    }

    console.log('Generating summary...');

    const prompt = `
Maak een uitgebreide samenvatting van de volgende cursustekst in het Nederlands.
Gebruik markdown formatting met headers, bullet points en emphasis waar nodig.
Focus op de hoofdpunten, belangrijke concepten en praktische informatie.

Cursustekst:
${text.substring(0, 4000)}

Structuur je samenvatting met:
- Een korte inleiding
- Hoofdpunten met bullet points
- Belangrijke concepten met definities
- Conclusie met key takeaways`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 2000
    });

    const summary = completion.choices[0].message.content;
    
    res.json({
      success: true,
      summary: summary
    });

  } catch (error) {
    console.error('Summary generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      details: error.message 
    });
  }
});

// Generate Exam Questions
app.post('/api/generate-exam-questions', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Text is too short. Please provide at least 50 characters.' 
      });
    }

    console.log('Generating exam questions...');

    const prompt = `
Analyseer de volgende cursustekst en maak 4-5 open examenvragen in het Nederlands.
Dit moeten vragen zijn die geschikt zijn voor een universitair examen.

Cursustekst:
${text.substring(0, 3000)}

Geef je antwoord in dit exacte JSON formaat:
{
  "examQuestions": [
    {
      "q": "Examenvraag hier (uitgebreid en analytisch)?",
      "points": 10,
      "type": "open"
    }
  ]
}

Maak vragen die:
- Begrip en toepassing testen
- Analytisch en kritisch denken vereisen  
- Geschikt zijn voor 8-15 punten
- Universitair niveau hebben`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 2000
    });

    const response = completion.choices[0].message.content;
    
    try {
      const parsedResponse = JSON.parse(response);
      res.json({
        success: true,
        examQuestions: parsedResponse.examQuestions
      });
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: 'AI returned invalid format'
      });
    }

  } catch (error) {
    console.error('Exam questions generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate exam questions',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max size is 10MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Learnly Backend running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});