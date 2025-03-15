interface Window {
    botpressWebChat?: {
      init: (config: any) => void
      sendEvent: (payload: any) => void
    }
  }
  
  