"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Pause, Play, RotateCcw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { projects } from "@/components/project-gallery"

export function ReelDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (open) {
      setTime(0)
      setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    } else setPlaying(false)
  }, [open])
  useEffect(() => {
    if (!playing || !open) return
    const timer = setInterval(() => setTime((current) => Math.min(current + 0.1, 15)), 100)
    return () => clearInterval(timer)
  }, [playing, open])
  useEffect(() => { if (time >= 15) setPlaying(false) }, [time])
  const scene = Math.min(Math.floor(time / 5), 2)
  const toggle = () => { if (time >= 15) setTime(0); setPlaying(!playing) }

  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="reel-dialog"><DialogHeader><span className="eyebrow">FAISAL / VISUAL REEL</span><DialogTitle>A study in feeling.</DialogTitle><DialogDescription>A cinematic sequence of concept imagery. Your original showreel belongs here.</DialogDescription></DialogHeader>
    <div className={`reel-stage ${playing ? "is-playing" : "is-paused"}`}>
      {projects.map((project, index) => <div key={project.id} className={`reel-scene ${scene === index ? "scene-active" : ""}`} aria-hidden={scene !== index}><Image src={project.image} alt={project.alt} fill sizes="(max-width: 900px) 95vw, 1000px" /><div className="reel-scene-shade" /><div className="reel-scene-copy"><span className="eyebrow">{project.type} / {project.id}</span><h3>{project.title}</h3><p>{project.mood}</p></div></div>)}
      <span className="reel-stage-mark">faisal.</span>
      {!playing && <button className="reel-center-play" onClick={toggle} aria-label={time >= 15 ? "Replay visual reel" : "Play visual reel"}>{time >= 15 ? <RotateCcw /> : <Play fill="currentColor" />}</button>}
    </div>
    <div className="reel-controls"><button onClick={toggle} aria-label={playing ? "Pause reel" : "Play reel"}>{playing ? <Pause size={18} /> : <Play size={18} />}</button><span className="reel-time">00:{String(Math.floor(time)).padStart(2, "0")}</span><label className="sr-only" htmlFor="reel-progress">Reel progress</label><input id="reel-progress" type="range" min="0" max="15" step="0.1" value={time} onChange={(event) => setTime(Number(event.target.value))} /><span className="reel-time">00:15</span><span className="reel-mode">VISUAL STUDY / NO AUDIO</span></div>
  </DialogContent></Dialog>
}
