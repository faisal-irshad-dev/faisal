"use client"

import { useState } from "react"
import { ArrowDownToLine, Check, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [downloaded, setDownloaded] = useState(false)
  function downloadBrief() {
    const brief = "A NEW STORY — PROJECT BRIEF FOR FAISAL\n\nYour name:\n\nYour email:\n\nProject / brand name:\n\nWhat is the story you want to tell?\n\nWho is it for?\n\nWhat should the audience feel?\n\nDeliverables (film, commercial, social edits, etc.):\n\nApproximate runtime:\n\nFootage / reference links:\n\nTimeline:\n\nBudget range:\n\nAnything else I should know?\n\n—\nSave your completed brief and share it with Faisal through your existing contact channel. This download does not send or submit your information.\n"
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "faisal-project-brief.txt"
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setDownloaded(true)
  }
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="contact-dialog"><DialogHeader><span className="eyebrow">LET&apos;S MAKE SOMETHING MATTER</span><DialogTitle>Every story starts<br />with an idea<span>.</span></DialogTitle><DialogDescription>A few thoughts, a wild idea, or a clear vision. Start with a project brief and make room for something great.</DialogDescription></DialogHeader><div className="brief-topics"><span>01 <strong>Your story</strong></span><span>02 <strong>Your vision</strong></span><span>03 <strong>The details</strong></span></div><button className="brief-download" onClick={downloadBrief}>{downloaded ? <Check size={19} /> : <ArrowDownToLine size={19} />} {downloaded ? "Download again" : "Download project brief"}<ArrowUpRight size={19} /></button><p className="contact-notice" role="status">{downloaded ? "Your brief is ready. Fill it out and share it with Faisal through your existing contact channel. Nothing has been submitted." : "Direct contact details are coming soon. In the meantime, prepare a brief to share with Faisal. No information is collected here."}</p></DialogContent></Dialog>
}
