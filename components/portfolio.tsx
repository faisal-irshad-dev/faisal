"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUpRight, Asterisk, Menu, Pause, Play, X } from "lucide-react"
import Image from "next/image"
import { IntroSequence } from "@/components/intro-sequence"
import { ProjectGallery } from "@/components/project-gallery"
import { ReelDialog } from "@/components/reel-dialog"
import { ContactDialog } from "@/components/contact-dialog"

export function Portfolio() {
  const [reelOpen, setReelOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [motion, setMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMotion(!media.matches)
    const onChange = () => setMotion(!media.matches)
    media.addEventListener("change", onChange)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node))
    return () => { observer.disconnect(); media.removeEventListener("change", onChange) }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off"
  }, [motion])

  return (
    <>
      <IntroSequence />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a href="#" className="wordmark" aria-label="Faisal home">faisal<span>.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Selected work <span>03</span></a>
          <a href="#about">Behind the cuts</a>
          <a href="#contact">Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-right">
          <span className="availability"><span className="status-dot" /> Open to good stories</span>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work <ArrowUpRight /></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Behind the cuts <ArrowUpRight /></a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight /></a>
        </nav>}
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-image-wrap"><Image className="hero-image" src="/images/hero-desert.webp" alt="A lone traveler among desert dunes and Joshua trees at golden hour" fill priority sizes="100vw" /></div>
          <div className="hero-shade" />
          <div className="hero-topline"><span className="eyebrow"><span className="tiny-cross">+</span> INDEPENDENT VIDEO EDITOR & VISUAL STORYTELLER</span><span className="hero-coordinates">A DIFFERENT POINT OF VIEW</span></div>
          <div className="hero-title">
            <h1 id="hero-heading"><span className="headline-line"><span>Not just seen.</span></span><span className="headline-line"><span>Felt<span className="headline-period">.</span></span></span></h1>
            <div className="hero-byline"><span className="byline-rule" /> THE ART OF MAKING YOU FEEL SOMETHING.</div>
          </div>
          <div className="hero-bottom">
            <div className="hero-description"><span className="eyebrow">HEY, I&apos;M FAISAL.</span><p>I turn moments into stories.<br />And stories into something that stays.</p></div>
            <button className="reel-button" onClick={() => setReelOpen(true)}><span className="reel-play"><Play size={18} fill="currentColor" /></span><span><strong>Play visual reel</strong><small>A LITTLE TASTE OF MY WORLD</small></span><ArrowUpRight className="reel-arrow" size={20} /></button>
          </div>
          <div className="hero-edge"><span>CRAFTED FRAME BY FRAME</span><button onClick={() => setMotion(!motion)} aria-label={motion ? "Pause ambient motion" : "Enable ambient motion"} aria-pressed={!motion}>{motion ? <Pause size={11} /> : <Play size={11} />} <span>MOTION {motion ? "ON" : "OFF"}</span></button></div>
        </section>

        <div className="hero-caption"><span>EDITING IS WHERE THE STORY FINDS ITS SOUL.</span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={13} /></a><span className="caption-right">PORTFOLIO — VOL. 01 / 2026</span></div>

        <ProjectGallery />

        <section id="about" className="about-section section-shell">
          <div className="section-kicker" data-reveal><span className="eyebrow">02 / BEHIND THE CUTS</span><Asterisk size={22} /></div>
          <div className="about-grid">
            <h2 className="about-heading" data-reveal>Anyone can cut.<br />Not everyone<br />can <span>make you feel.</span></h2>
            <div className="about-copy" data-reveal>
              <p className="about-lead">I&apos;m Faisal. An editor by craft.<br />A storyteller by instinct.</p>
              <p>To me, an edit isn&apos;t a sequence of clips. It&apos;s the pause before the drop. The breath between two moments. The one frame that changes everything.</p>
              <p>I bring rhythm, intention, and a little obsession to every timeline. Because the best work doesn&apos;t just hold your attention. It stays with you.</p>
              <a className="text-link" href="#contact">LET&apos;S CREATE SOMETHING THAT MATTERS <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="craft-grid" data-reveal>
            {[{ n: "01", title: "The story comes first.", text: "Find the human thread. Build everything around it.", tags: "STORY DEVELOPMENT · NARRATIVE EDITING" }, { n: "02", title: "Find the feeling.", text: "Rhythm, color, and sound. Every detail in conversation.", tags: "COLOR GRADING · SOUND DESIGN" }, { n: "03", title: "Make every frame count.", text: "Refine until nothing is missing. And nothing is extra.", tags: "MOTION DESIGN · FINISHING" }].map((item) => <div className="craft-item" key={item.n}><span className="craft-number">{item.n}</span><h3>{item.title}</h3><p>{item.text}</p><span className="craft-tags">{item.tags}</span></div>)}
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0, 1, 2, 3].map((item) => <span key={item}>GOOD STORIES DESERVE GREAT EDITS. <Asterisk /></span>)}</div></div>

        <section id="contact" className="contact-section section-shell">
          <div className="contact-top" data-reveal><span className="eyebrow">03 / THE NEXT CHAPTER</span><span className="availability"><span className="status-dot" /> Open to collaborations</span></div>
          <div className="contact-main" data-reveal><h2>Have a story?<br />Let&apos;s make it <span>felt.</span></h2><button className="contact-arrow" onClick={() => setContactOpen(true)} aria-label="Start a project with Faisal"><ArrowUpRight strokeWidth={1} /></button></div>
          <div className="contact-bottom" data-reveal><p>A film. A brand. An idea you can&apos;t stop thinking about.<br />Let&apos;s give it a life beyond the timeline.</p><button className="text-link" onClick={() => setContactOpen(true)}>START A CONVERSATION <ArrowUpRight size={18} /></button></div>
        </section>
      </main>

      <footer className="site-footer"><a href="#" className="wordmark" aria-label="Back to top">faisal<span>.</span></a><span>INDEPENDENT MIND. INTENTIONAL WORK.</span><span>© {new Date().getFullYear()} FAISAL</span><a href="#" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></footer>
      <ReelDialog open={reelOpen} onOpenChange={setReelOpen} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
}
