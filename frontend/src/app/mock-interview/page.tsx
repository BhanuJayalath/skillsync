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

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

type SpeechRecognition = EventTarget & {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
};

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

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])

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

  const handleSpeechError = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error)
    setIsRecording(false)
  }

  const handleSpeechEnd = () => {
    setIsRecording(false)
  }

  const speakText = (text: string) => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel() // Cancel any ongoing speech synthesis
  
      const utterances = text.match(/[^.!?]+[.!?]+/g) || [text]; // Split text into sentences
  
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

  const startInterview = async () => {
    setIsInterviewStarted(true)
    setMessages([])
    const firstQuestion = await generateQuestion([])
    addMessage(firstQuestion, true)
    speakText(firstQuestion)
  }

  const startSpeaking = () => {
    setIsRecording(true)
    recognitionRef.current?.start()
  }

  const endInterview = () => {
    setIsInterviewStarted(false)
    setMessages([])
  }

  return (
    <>
      <Navbar />
      <div className={styles.chatContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>AI Mock Interview</h1>
          <p className={styles.subtitle}>Practice your interview skills with an AI interviewer.</p>
        </div>
        <div className={styles.interviewArea}>
          <div className={styles.aiVisual}>
            <Image src="/mock-interview/voiceai.gif" alt="AI Interviewer" width={200} height={200} className={styles.interviewer}/>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${msg.role === 'assistant' ? styles.bot : styles.user}`}>
                {msg.content}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.userInput}>
          {!isInterviewStarted ? (
            <button className={styles.button} onClick={startInterview}>Start New Interview</button>
          ) : (
            <>
              <button className={styles.button} onClick={startSpeaking} disabled={isRecording}>
                {isRecording ? 'Listning...' : 'Start Speaking'}
              </button>
              {isRecording && <div className={styles.recordingIndicator}>Recording...</div>}
              <button className={styles.button} onClick={endInterview}>End Interview</button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}