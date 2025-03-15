'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Chat.module.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Image from 'next/image'

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

const SYSTEM_MESSAGE = `
You are an AI-driven mock technical interviewer from SkillSync. Your goal is to simulate a professional interview environment by asking technical, behavioral, and situational questions.

IMPORTANT CONVERSATION FLOW:
1. Start with a welcome message introducing yourself as an AI interviewer from SkillSync
2. After each user response, you MUST:
   a. Acknowledge their response, even if it's "I don't have experience with that"
   b. Provide brief feedback or a follow-up comment (4-5 sentences)
   c. Ask a DIFFERENT question (never repeat the same question)
3. If the user says they don't have experience with something, acknowledge this and move to a different type of question
4. Maintain context throughout the interview - refer to previous answers when appropriate
5. Alternate between technical and behavioral questions

Guidelines:
- Keep all responses concise and to the point (maximum 3-4 sentences total)
- Don't use bold text or role prefixes like "Interviewer:"
- Always structure your response as: "Acknowledgment of their answer. Brief comment. New question?"
- Maintain a conversational, encouraging, and professional tone
- NEVER repeat the welcome message after the interview has started
- Technical questions should cover programming, algorithms, data structures, and system design
- Behavioral questions should assess teamwork, problem-solving, and communication skills

Example welcome message (ONLY use ONCE at the start):
"Welcome to your mock technical interview session! I'm an AI interviewer from SkillSync. I'll be asking a mix of technical and behavioral questions to help you prepare. Let's begin with a fundamental concept: Can you explain the difference between an array and a linked list?"

Example response to "I don't have experience with that":
"That's perfectly fine, not everyone has had that specific experience. Let's try a different approach. Can you tell me about a technical project you've worked on that you're particularly proud of?"

Remember: Your responses should be brief, focused, and ALWAYS include acknowledgment of their previous answer before asking a new question.
`

// Extend the Window interface to include the SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// Speech recognition API types
type SpeechRecognition = EventTarget & {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
};

// Speech recognition event types
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

// Main chat component
export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const [questionType, setQuestionType] = useState<'technical' | 'behavioral'>('technical')
  const [isFirstInteraction, setIsFirstInteraction] = useState(true)
  const conversationHistoryRef = useRef<{ role: string; content: string }[]>([])

  // Initialize the speech synthesis and recognition APIs when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis

      const loadVoices = () => {
        voicesRef.current = synthesisRef.current?.getVoices() || []
        if (voicesRef.current.length === 0) {
          synthesisRef.current?.addEventListener('voiceschanged', () => {
            voicesRef.current = synthesisRef.current?.getVoices() || []
          })
        }
      }

      loadVoices()

      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognitionAPI()
        recognitionRef.current.lang = 'en-US'
        recognitionRef.current.interimResults = false
        recognitionRef.current.maxAlternatives = 1

        recognitionRef.current.onresult = handleSpeechResult
        recognitionRef.current.onerror = handleSpeechError
        recognitionRef.current.onend = handleSpeechEnd
      }
    }
  }, [])

  // Update conversation history ref when messages change
  useEffect(() => {
    conversationHistoryRef.current = messages;
  }, [messages]);

  // Generate a question based on the conversation history
  const sanitizeText = (text: string) => {
    return text.replace(/[*_`]/g, ''); // Removes *, _, and ` characters
  };
  
  const generateQuestion = async (conversationHistory: { role: string; content: string }[]) => {
    try {
      // Toggle question type for variety
      const nextQuestionType = questionType === 'technical' ? 'behavioral' : 'technical';
      setQuestionType(nextQuestionType);
      
      // Add instruction to generate specific question type
      let typeInstruction = '';
      
      if (isFirstInteraction) {
        // For the first interaction, generate a welcome message with an initial question
        typeInstruction = `Please provide a welcome message introducing yourself as an AI interviewer from SkillSync, followed by an initial ${nextQuestionType} question. Use the example welcome message format from the system prompt.`;
        setIsFirstInteraction(false);
      } else {
        // Check if the user's last response indicates lack of experience
        const lastUserMessage = conversationHistory.filter(msg => msg.role === 'user').pop()?.content.toLowerCase() || '';
        const lacksExperience = lastUserMessage.includes("don't have") || 
                               lastUserMessage.includes("no experience") || 
                               lastUserMessage.includes("haven't had");
        
        if (lacksExperience) {
          typeInstruction = `The user indicated they don't have experience with your previous question. Acknowledge this, be supportive, and ask a completely different ${nextQuestionType} question. Use the example response for "I don't have experience with that" as a guide.`;
        } else {
          // For subsequent questions, provide feedback and then a follow-up question
          typeInstruction = `Based on the user's last answer, acknowledge their response, provide a brief comment, and then ask a new ${nextQuestionType} question that's different from any previous questions. Your response must include acknowledgment of their answer before asking a new question. Total response should be 3-4 sentences maximum.`;
        }
      }
      
      const requestBody = {
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_MESSAGE }] },
          ...conversationHistory.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          })),
          // Add the type instruction as the last message
          { role: 'user', parts: [{ text: typeInstruction }] }
        ]
      };
  
      console.log('Gemini Input:', requestBody);
  
      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
  
      console.log('Gemini Response:', data);
  
      let responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 
        "I'm having trouble connecting to the servers right now.";
  
      // For welcome message, we allow it to be longer
      if (!isFirstInteraction && responseText.length > 300) {
        responseText = responseText.substring(0, 300) + "...";
      }
      
      responseText = sanitizeText(responseText); // Clean the text before displaying
  
      return responseText;
    } catch (error) {
      console.error('Error generating question:', error);
      return "I'm having trouble generating a question right now.";
    }
  };
  
  const handleSpeechResult = async (event: SpeechRecognitionEvent) => {
    const userAnswer = event.results[0][0].transcript
    addMessage(userAnswer)
    
    // Use the updated conversation history including the new user message
    const updatedHistory = [...conversationHistoryRef.current, { role: 'user', content: userAnswer }];
    const nextQuestion = await generateQuestion(updatedHistory)
    addMessage(nextQuestion, true)
    speakText(nextQuestion)
  }
  
  const addMessage = (message: string, isBot = false) => {
    setMessages(prev => [...prev, { role: isBot ? 'assistant' : 'user', content: message }])
  }

  // Handle speech recognition errors
  const handleSpeechError = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
    setIsRecording(false);
  
    if (event.error === 'no-speech') {
      addMessage("I didn't catch that. Please try speaking again.", true);
    } else {
      addMessage("An error occurred with speech recognition. Please try again.", true);
    }
  };

  const handleSpeechEnd = () => {
    setIsRecording(false)
  }
  
  // Speak the given text using the browser's speech synthesis API
  const speakText = (text: string) => {
    const sanitizedText = sanitizeText(text);
    
    if (synthesisRef.current) {
      synthesisRef.current.cancel() // Cancel any ongoing speech synthesis
  
      const utterances = sanitizedText.match(/[^.!?]+[.!?]+/g) || [sanitizedText]; // Split text into sentences
  
      // Speak each sentence sequentially
      const speakNext = (index: number) => {
        if (index < utterances.length) {
          const utterance = new SpeechSynthesisUtterance(utterances[index]);
          utterance.lang = 'en-US';
          const selectedVoice = voicesRef.current.find(voice => voice.name === 'Google US English');
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
          utterance.onend = () => speakNext(index + 1); // Speak the next chunk after the current one ends
          if (synthesisRef.current) {
            synthesisRef.current.speak(utterance);
          }
        }
      };
  
      speakNext(0); // Start speaking the first chunk
    }
  };

  // Start the interview by generating the first question
  const startInterview = async () => {
    setIsTermsAccepted(true)
    setIsInterviewStarted(true)
    setMessages([])
    setIsFirstInteraction(true)
    conversationHistoryRef.current = []
    const firstQuestion = await generateQuestion([])
    addMessage(firstQuestion, true)
    speakText(firstQuestion)
  }

  // Start listening for user responses
  const startSpeaking = () => {
    setIsRecording(true)
    recognitionRef.current?.start()
  }

  // End the interview and clear the chat messages
  const endInterview = () => {
    setIsInterviewStarted(false)
    setMessages([])
    setIsFirstInteraction(true)
    conversationHistoryRef.current = []
    if (synthesisRef.current) {
      synthesisRef.current.cancel() // Cancel any ongoing speech synthesis
    }
  }
 
  // scroll to the bottom of the chat messages when new messages are added
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <Navbar />
      <div className={styles.chatContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>AI Mock Interview</h1>
          <p className={styles.subtitle}>Practice your interview skills with an AI interviewer.</p>
        </div>
        {!isTermsAccepted ? (
        <div className={styles.termsArea}>
          <h3 className={styles.terms}>Terms and Conditions:</h3>
          <p className={styles.li}>Please read and accept the terms and conditions before starting the interview.</p>
          
        <p>By using this AI Mock Interview tool, you agree to the following terms and conditions:</p>
        <ul>
          <li className={styles.li}>• This tool is for educational purposes only and is designed to help you practice your interview skills.</li>
          <li className={styles.li}>• The AI interviewer will ask you a series of technical and behavioral questions to simulate a real interview.</li>
          <li className={styles.li}>• Your responses will be recorded and analyzed to provide feedback and improve your performance.</li>
          <li className={styles.li}>• Do not share any personal or sensitive information during the interview.</li>
          <li className={styles.li}>• We are not responsible for any decisions made based on the feedback provided by this tool.</li>
  
          <li className={styles.accept}>By clicking the start button, you agree to these terms and conditions and consent to the use of your responses for educational purposes.</li>
        </ul>

       <button className={styles.icons} onClick={startInterview}>
            <img width="30" height="30" src="https://img.icons8.com/ios/50/shutdown--v1.png" alt="shutdown--v1" />
          </button>
        </div>
      ) : (
        <>
        <div className={styles.interviewArea}>
          <div className={styles.aiVisual}>
            <Image src="/mock-interview/ai.gif" alt="AI Interviewer" width={200} height={200} className={styles.interviewer}/>
          </div>
          <div className={styles.chatMessages} ref={chatMessagesRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${msg.role === 'assistant' ? styles.bot : styles.user}`}>
                {msg.content}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.userInput}>
          {!isInterviewStarted ? (
            <button className={styles.icons} onClick={startInterview}>
                    <img width="30" height="30" src="https://img.icons8.com/ios/50/shutdown--v1.png" alt="shutdown--v1" />

            </button>
          ) : (
            <>
              <button className={styles.icons} onClick={startSpeaking} disabled={isRecording}>
                <img width="30" height="30" src="https://img.icons8.com/ios/50/microphone.png" alt="microphone" />
              </button>
              {isRecording && <div className={styles.recordingIndicator}>Listening...</div>}
              <button className={styles.icons} onClick={endInterview}>
                <img width="30" height="30" src="https://img.icons8.com/ios/50/shutdown--v1.png" alt="end--v1" />
              </button>            
              </>
          )}
        </div>
        </>
      )}
      </div>
      <Footer />
    </>
  )
}