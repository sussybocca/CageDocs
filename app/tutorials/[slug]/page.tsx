import {notFound} from "next/navigation";
import SiteShell from "@/components/SiteShell";
import AnimatedTutorial from "@/components/AnimatedTutorial";
import {tutorials} from "@/content/catalog";
export function generateStaticParams(){return tutorials.map(t=>({slug:t.slug}))}
export const dynamicParams=false;
export default async function TutorialPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const t=tutorials.find(x=>x.slug===slug);if(!t)notFound();return <SiteShell><article className="doc"><span className="eyebrow">animated tutorial</span><h1>{t.title}</h1><p className="lead">{t.summary}</p><AnimatedTutorial tutorial={t}/></article></SiteShell>}
