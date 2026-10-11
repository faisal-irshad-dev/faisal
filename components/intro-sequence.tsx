"use client"

import { useEffect, useState } from "react"

export function IntroSequence() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(false); return }
    let frame: number
    const start = performance.now()
    const tick = (now: number) => {
      const value = Math.min(100, Math.floor((now - start) / 13))
      setProgress(value)
      if (value < 100) frame = requestAnimationFrame(tick)
      else setExiting(true)
    }
    frame = requestAnimationFrame(tick)
    const finish = window.setTimeout(() => setVisible(false), 2050)
    return () => { cancelAnimationFrame(frame); clearTimeout(finish) }
  }, [])

  if (!visible) return null
  return <div className={`intro-screen${exiting ? " intro-exit" : ""}`} aria-label="Opening sequence">
    <div className="intro-top"><span className="wordmark">faisal<span>.</span></span><button onClick={() => setVisible(false)}>SKIP INTRO ↗</button></div>
    <div className="intro-center"><span className="eyebrow">BEFORE THE FIRST FRAME</span><p>A little<br /><span>anticipation.</span></p></div>
    <div className="intro-bottom"><span>EVERY GOOD STORY STARTS WITH A FEELING.</span><span className="intro-count" aria-hidden="true">{String(progress).padStart(2, "0")}<small>/ 100</small></span></div>
    <div className="intro-progress" style={{ transform: `scaleX(${progress / 100})` }} />
  </div>
}
