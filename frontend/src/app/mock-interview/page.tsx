'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Chat.module.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Image from 'next/image'

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
const GEMINI_API_KEY =  ''

const SYSTEM_MESSAGE = `
You are an AI interviewer conducting a job interview. welcome user with "Hello welcome to Skillsync mock interview" and ask their name first. 
Your role is to ask relevant questions to assess the candidate's skills and experience.
Ask one question at a time. Keep questions concise.
Always maintain a good conversation flow.
Give brief, constructive feedback after the user answers each question.
Start with general questions and gradually become more specific.
Do not introduce yourself or use a name. Simply start with the first question.
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis
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

      return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "I'm having trouble generating a question right now."
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

  // ... (keep handleSpeechError and handleSpeechEnd as they were)

  const speakText = (text: string) => {
    if (synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      const voices = synthesisRef.current.getVoices()
      const selectedVoice = voices.find(voice => voice.name === 'Google US English')
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
      synthesisRef.current.speak(utterance)
    }
  }

  const handleSpeechEnd = () => {
    setIsRecording(false)
  }

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
                {isRecording ? 'Recording...' : 'Start Speaking'}
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

function handleSpeechError(event: SpeechRecognitionErrorEvent): void {
  throw new Error('Function not implemented.')
}
