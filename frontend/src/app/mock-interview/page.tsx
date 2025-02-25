'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Chat.module.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Image from 'next/image'


const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

const SYSTEM_MESSAGE = `
You are an AI-driven mock technical interviewer designed to help users prepare for technical internship interviews. Your role is to simulate a professional interview environment by asking technical, behavioral, and situational questions. Your responses should be conversational, encouraging, and professional, providing feedback when necessary user will anser your questions. Your only the interviewer dont give full conversations..  

Guidelines:
- dont Give *bold* text and **Interviewer:**- roles in the chat.  
- Start the session by introducing yourself as the and explaining the structure of the interview.
- Ask technical questions related to programming, algorithms, data structures, system design, or other relevant topics based on the user’s preferences.  
- Conduct the interview in a natural and friendly manner.  
- Ask one question at a time, keeping it clear and concise.  
- Include behavioral questions (e.g., 'Tell me about a time you worked in a team') to assess soft skills.
- After each answer, analyze the response and provide constructive feedback, including suggestions for improvement.
- Conclude the session with a summary of the user’s performance, highlighting strengths and areas for improvement.
- Ensure all interactions are supportive, encouraging, and focused on improving the user’s skills.
- Provide brief, constructive feedback** after each response.  

Example Interactions: this is only an example. dont ask in the same way every time! 
- Start with: 'Welcome to your mock technical interview session! I'm AI interviewer from SkillSync I’ll be asking a mix of technical and behavioral questions to help you prepare. Let’s begin with an easy one. then aks with a simple question. after that continue with user response'
- Respond to an answer: 'That’s a good attempt! You mentioned the key idea of polymorphism, but you could also elaborate on how it’s implemented in real-world applications, like using method overriding. Let’s try another question.'
Stay adaptive to the user's responses and maintain an engaging conversation throughout the session."
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

  // Generate a question based on the conversation history
  const generateQuestion = async (conversationHistory: { role: string; content: string }[]) => {
    try {
      const requestBody = {
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_MESSAGE }] },
          ...conversationHistory.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          }))
        ]
      }

      console.log('Gemini Input:', requestBody)

      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()

      console.log('Gemini Response:', data)

      return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "I'm having trouble conecting to the servers right now."
    } catch (error) {
      console.error('Error generating question:', error)
      return "I'm having trouble generating a question right now."
    }
  }

  const addMessage = (message: string, isBot = false) => {
    setMessages(prev => [...prev, { role: isBot ? 'assistant' : 'user', content: message }])
  }

  const handleSpeechResult = async (event: SpeechRecognitionEvent) => {
    const userAnswer = event.results[0][0].transcript
    addMessage(userAnswer)
    
    const nextQuestion = await generateQuestion([...messages, { role: 'user', content: userAnswer }])
    addMessage(nextQuestion, true)
    speakText(nextQuestion)
  }

  // Handle speech recognition errors
  const handleSpeechError = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error)
    setIsRecording(false)
  }

  const handleSpeechEnd = () => {
    setIsRecording(false)
  }
  
  // Speak the given text using the browser's speech synthesis API
  const speakText = (text: string) => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel() // Cancel any ongoing speech synthesis
  
      const utterances = text.match(/[^.!?]+[.!?]+/g) || [text]; // Split text into sentences
  
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