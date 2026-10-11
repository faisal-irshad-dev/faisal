"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export const projects = [
  { id: "01", title: "Somewhere, nowhere.", category: "Films", type: "TRAVEL FILM", image: "/images/hero-desert.webp", alt: "A traveler crossing a warm desert at sunset", year: "2026", description: "A visual study in getting lost. Sun-bleached horizons, unhurried moments, and the quiet pull of the open road.", craft: "Narrative editing / Color direction / Atmosphere", mood: "Warm. Expansive. Human." },
  { id: "02", title: "After hours.", category: "Commercial", type: "AUTOMOTIVE", image: "/images/night-drive.webp", alt: "A black sports car on a rain-soaked city street at night", year: "2026", description: "The city changes when the lights go down. An exploration of movement, contrast, and the rhythm hiding in the dark.", craft: "Pacing / Color direction / Visual rhythm", mood: "Electric. Precise. Restless." },
  { id: "03", title: "Between the waves.", category: "Experiments", type: "VISUAL POETRY", image: "/images/ocean.webp", alt: "A solitary surfer beneath a towering silver ocean wave", year: "2026", description: "That suspended moment between stillness and surrender. A study of scale, texture, and our small place in something bigger.", craft: "Visual storytelling / Texture / Color direction", mood: "Quiet. Elemental. Free." },
]

export function ProjectGallery() {
  const [filter, setFilter] = useState("All work")
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null)
  const [grade, setGrade] = useState(true)
  const visible = projects.filter((project) => filter === "All work" || project.category === filter)

  return <section id="work" className="work-section section-shell">
    <div className="section-kicker" data-reveal><span className="eyebrow">01 / SELECTED WORK</span><span className="eyebrow">A FEW FRAMES FROM MY WORLD</span></div>
    <div className="work-heading-row" data-reveal><h2>Made to <span>move you.</span><sup>(03)</sup></h2><p>Different stories. One intention.<br />Leave something behind.</p></div>
    <div className="work-toolbar" data-reveal><div className="work-filters" role="group" aria-label="Filter projects">{["All work", "Films", "Commercial", "Experiments"].map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)} className={filter === item ? "filter-active" : ""}>{item}{item === "All work" && <span>03</span>}</button>)}</div><span className="concept-label">CREATIVE DIRECTION / CONCEPT STUDIES</span></div>
    <div className="project-grid" aria-live="polite">
      {visible.map((project) => <button className="project-card" key={project.id} onClick={() => { setSelected(project); setGrade(true) }} aria-label={`Explore ${project.title}`}>
        <div className="project-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /><div className="project-film-shade" /><span className="project-id">F / {project.id}</span><span className="project-hover-icon"><ArrowUpRight size={27} strokeWidth={1.5} /></span><span className="project-image-label">EXPLORE THE FEELING <Plus size={14} /></span></div>
        <div className="project-info"><h3>{project.title}</h3><ArrowUpRight size={20} /></div><div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div>
      </button>)}
    </div>
    <div className="work-footnote"><span>MORE THAN WHAT YOU SEE. IT&apos;S WHAT YOU FEEL.</span><span>CONCEPT VISUALS · ORIGINAL EDITS COMING SOON</span></div>

    <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
      <DialogContent className="project-dialog">
        {selected && <><DialogHeader><span className="eyebrow">CONCEPT STUDY / {selected.id}</span><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.description}</DialogDescription></DialogHeader>
          <div className={`project-preview ${grade ? "" : "ungraded"}`}><Image src={selected.image} alt={selected.alt} fill sizes="(max-width: 800px) 90vw, 800px" /><span className="preview-label">{grade ? "THE FEELING" : "MONOCHROME STUDY"}</span></div>
          <div className="project-dialog-meta"><div><span className="eyebrow">THE CRAFT</span><p>{selected.craft}</p></div><button className="grade-toggle" onClick={() => setGrade(!grade)} aria-pressed={!grade}>{grade ? "Explore in monochrome" : "Return to color"} <ArrowUpRight size={15} /></button></div>
          <p className="project-disclaimer">{selected.mood} Illustrative concept imagery, not a client commission or finished film.</p>
        </>}
      </DialogContent>
    </Dialog>
  </section>
}
