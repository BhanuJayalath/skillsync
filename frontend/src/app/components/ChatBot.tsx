"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export default function ChatBot() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initialize Botpress webchat only after the script is loaded
    if (isLoaded && window.botpressWebChat) {
      window.botpressWebChat.init({
        botId: "1b372c2d-1c58-431c-abfb-5fe8d29bc1a1",
        clientId: "1b372c2d-1c58-431c-abfb-5fe8d29bc1a1",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        botName: "SkillSync Assistant",
        stylesheet: "https://cdn.botpress.cloud/webchat/v1/webchat.css",
      })
    }
  }, [isLoaded])

  return (
    <>
      <Script src="https://cdn.botpress.cloud/webchat/v1/inject.js" onLoad={() => setIsLoaded(true)} />
      <Script id="botpress-config" strategy="lazyOnload">
        {`
          window.botpressWebChat = window.botpressWebChat || {};
          window.botpressWebChat.sendEvent = function(payload) {
            window.postMessage({ type: 'webchatEvent', payload }, '*');
          }
        `}
      </Script>
    </>
  )
}

