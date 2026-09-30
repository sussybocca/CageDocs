import {notFound} from "next/navigation";
import SiteShell from "@/components/SiteShell";
import {docPages,glyphs} from "@/content/catalog";
export function generateStaticParams(){return docPages.map(p=>({slug:p.slug}))}
export const dynamicParams=false;
export default async function DocPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const p=docPages.find(x=>x.slug===slug);if(!p)notFound();return <SiteShell><article className="doc"><span className="eyebrow">{p.section}</span><h1>{p.title}</h1><p className="lead">{p.summary}</p><div className="docMeta"><span className={"badge "+(p.status==="design"?"design":"")}>{p.status==="implemented"?"runtime-backed":"design / declared"}</span><span className="badge">CAGE 0.1 docs</span></div>{p.body.split("\n\n").map((block,i)=>block.startsWith("## ")?<h2 key={i}>{block.slice(3)}</h2>:<p key={i}>{block.replace(/\*\*/g,"")}</p>)}<h2>Focused example</h2><pre className="code">{p.example}</pre><h2>Core glyph reminder</h2><div className="glyphTable">{glyphs.slice(0,8).map(([g,d])=><div className="glyphRow" key={d}><span className="glyph">{g}</span><span>{d}</span></div>)}</div></article></SiteShell>}
