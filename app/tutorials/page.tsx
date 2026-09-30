import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import {tutorials} from "@/content/catalog";
export default function Tutorials(){return <SiteShell><div className="doc"><span className="eyebrow">24 interactive lessons</span><h1>Animated tutorials</h1><p className="lead">Each tutorial automatically advances through visual steps, highlights the active stage, and lets you pause or scrub manually on desktop or mobile.</p></div><div className="cards">{tutorials.map(t=><Link className="card" href={"/tutorials/"+t.slug+"/"} key={t.slug}><span className="badge">animated</span><h3>{t.title}</h3><p>{t.summary}</p></Link>)}</div></SiteShell>}
