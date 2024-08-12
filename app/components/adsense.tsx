import Script from 'next/script'
import React from 'react'

const Adsense = () => {
  return (
    <Script
     async 
     src= {"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6750910168939577"}
     crossOrigin= "anonymous"
     strategy='afterInteractive'
    />
  )
}

export default Adsense