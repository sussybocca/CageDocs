export type Status="implemented"|"design";
export type DocPage={slug:string;title:string;section:string;summary:string;status:Status;body:string;example:string};
export type Tutorial={slug:string;title:string;summary:string;steps:{title:string;detail:string;code:string}[]};
const slugify=(v:string)=>v.toLowerCase().replace(/c\+\+/g,"cpp").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const specs:[string,string[]][]=[
["Getting Started",["Introduction","Language philosophy","Emoji source files","Program entry","Blocks and boundaries","Statements","Arguments","Whitespace and indentation","Grapheme normalization","Identifiers","Numbers","Strings","Booleans","First program","Compiler pipeline","Runtime profiles"]],
["Core Syntax",["Glyph reference","Entry glyph","Block open","Block close","Statement marker","Argument marker","Variable declaration","Assignment","Number literal","String literal","Output","Operator precedence","Arithmetic operators","Equality operators","Comparison operators","Logical operators","Unary not","Expression grouping"]],
["Data & Control",["Variable lifetime","Scope","Mutation","Numeric values","Text values","Truth values","Value conversion","If conditions","Else branches","Nested conditions","Loops","Loop counters","Break design","Continue design","State patterns","Validation patterns","Expression evaluation","Control-flow diagnostics"]],
["Functions & Modules",["Function declaration","Parameters","Arguments","Function calls","Return values","Local scope","Recursion design","Pure functions","Side effects","Call diagnostics","Function organization","Reusable helpers","Module design","Imports design","Exports design","Package boundaries"]],
["Runtime & VM",["Native C++ runtime","Grapheme lexer","Parser","AST","Bytecode compiler","CGB1 bytecode","VM execution","JIT profile","Native-exec profile","Constant folding","Value stack","Scope frames","Call frames","Execution timeout","Memory accounting","Diagnostics","Runtime server"]],
["Capabilities & Security",["Capability model","Capability declarations","Host grants","Capability broker","Filesystem read","Filesystem write","Workspace path cage","Database read","Database write","Database key validation","Denied operations","Resource cage","Execution timeout limits","Memory limits","Trust boundaries","Security diagnostics","Least-privilege patterns"]],
["UI & Scenes",["UI overview","Scene graph","Scene nodes","Window nodes","Panel nodes","Text nodes","Button nodes","Editor nodes","Node identifiers","Text properties","Action properties","Color properties","Layout defaults","Nested children","Scene revisions","CGD1 snapshots","CGDP encoding","Surface modes"]],
["Storage & Database",["Storage overview","CAGE database","Database get","Database set","Database keys","Persistence directory","Filesystem storage","Workspace-relative paths","Path normalization","Read failures","Write failures","Storage permissions","State persistence patterns","Data validation","Storage diagnostics"]],
["Networking & Remote",["Remote runtime overview","Runtime server protocol","WebSocket transport","Remote scene delivery","Input round trip","Surface session design","Connection lifecycle","Message framing design","Remote diagnostics","Reconnect design","Latency considerations","Server authority","Client trust boundary","Remote deployment design"]],
["Tooling & Deployment",["CAGE CLI","Build runtime","Check source","Compile source","Run source","VM mode selection","JIT mode selection","Native profile design","w64devkit build","C++20 requirements","Windows runtime","Project layout","Diagnostics workflow","Static docs deployment","ZIP synchronization workflow"]]
];
const implementedSections=new Set(["Runtime & VM","Capabilities & Security","UI & Scenes","Storage & Database"]);
const knownImplemented=new Set(["Compiler pipeline","Runtime profiles","Program entry","Blocks and boundaries","Statements","Arguments","Numbers","Strings","First program","CAGE CLI","Build runtime","Check source","Compile source","Run source","w64devkit build","C++20 requirements","Windows runtime","Diagnostics workflow"]);
function statusFor(section:string,title:string):Status{if(implementedSections.has(section)||knownImplemented.has(title))return"implemented";if(section==="Networking & Remote"&&["Runtime server protocol","WebSocket transport","Remote scene delivery","Input round trip","Server authority","Client trust boundary"].includes(title))return"implemented";return"design"}
function grammarExample(title:string,section:string){if(/variable|assignment|mutation|scope/i.test(title))return`🏁 🧰
  🔸 📦 score ⬅️ 🔢 10
  🔸 score ⬅️ score ➕ 🔢 5
  🔸 📢 score
🔒`;if(/if|else|condition|comparison/i.test(title))return`🏁 🧰
  🔸 📦 score ⬅️ 🔢 12
  🔸 🤔 score 🔼 🔢 10 🧰
    🔸 📢 📝high score🛑
  🔒
  🔸 🙃 🧰
    🔸 📢 📝keep going🛑
  🔒
🔒`;if(/loop/i.test(title))return`🏁 🧰
  🔸 🔁 🔢 3 🧰
    🔸 📢 📝CAGE loop🛑
  🔒
🔒`;if(/function|parameter|argument|call|return/i.test(title))return`🛠️ greet 🔹 name 🧰
  🔸 📢 name
  🔸 ↩️ name
🔒
🏁 🧰
  🔸 📞 greet 🔹 📝CAGE🛑
🔒`;if(/capability|filesystem|database|storage|permission|security/i.test(title+" "+section))return`🛡️ 📝filesystem.read🛑
🛡️ 📝database.read🛑
🏁 🧰
  🔸 📢 📝capability-gated program🛑
🔒`;if(/operator|expression|numeric/i.test(title))return`🏁 🧰
  🔸 📦 total ⬅️ 🔢 8 ➕ 🔢 4 ✖️ 🔢 2
  🔸 🤔 total ▶️ 🔢 10 🤝 🚫 total 🟰 🔢 0 🧰
    🔸 📢 total
  🔒
🔒`;return`🏁 🧰
  🔸 📢 📝Hello from CAGE🛑
🔒`}
function bodyFor(section:string,title:string,status:Status){const implementation=status==="implemented"?"This topic is documented as runtime-backed in the current CAGE 0.1 implementation or its exposed tooling.":"This topic belongs to the declared language/design surface. Treat it as specification guidance unless your current runtime build explicitly exposes it.";return`## What this covers

**${title}** is part of **${section}**. CAGE source is tokenized by grapheme clusters rather than assuming one Unicode code point equals one language token. Emoji glyphs carry structural syntax while identifiers and string contents can still carry data.

${implementation}

## Core rules

CAGE is strict by design: block structure must be unambiguous, source formatting is normalized before parsing, programs have one entry surface, and runtime work is subject to resource limits. Diagnostics are part of the language contract.

## Runtime relationship

The native architecture uses a grapheme lexer, parser/AST, bytecode compiler, and C++ VM. Runtime-backed operations pass through the active execution profile and, when required, the capability broker. Declaring a capability does not automatically grant it: the host must also allow it.

## Practical guidance

Keep statements visually obvious, avoid hiding multiple state changes in one expression, request only the capabilities you need, and keep UI/storage work inside the documented workspace and runtime boundaries.`}
export const docPages:DocPage[]=specs.flatMap(([section,topics])=>topics.map(title=>{const status=statusFor(section,title);return{slug:slugify(section+" "+title),title,section,status,summary:`${title} in CAGE: syntax, behavior, runtime relationship, constraints, and a focused example.`,body:bodyFor(section,title,status),example:grammarExample(title,section)}}));
export const sections=specs.map(([title])=>title);
const tutorialNames=["Your first CAGE program","Read emoji syntax","Declare and update variables","Work with strings","Build expressions","Write an if branch","Add an else branch","Repeat with loops","Create a function","Pass function arguments","Return a value","Understand scopes","Read compiler diagnostics","Choose a runtime profile","Understand bytecode","See JIT constant folding","Request capabilities","Use the filesystem cage","Use database capabilities","Build a UI scene","Compose panels and text","Wire buttons and actions","Understand CGDP scene delivery","Debug a remote surface"];
function tutorialSteps(name:string){return[{title:"Orient",detail:`Identify the structural glyphs used by ${name.toLowerCase()}.`,code:"🏁  🧰  🔸  🔒"},{title:"Build",detail:"Add one small operation and keep the block shape explicit.",code:"🏁 🧰\n  🔸 📢 📝CAGE🛑\n🔒"},{title:"Inspect",detail:"Follow source through grapheme lexing, parsing, and compilation.",code:"source → graphemes → AST → bytecode"},{title:"Constrain",detail:"Check runtime limits and capability requirements before execution.",code:"🛡️ declared ∩ host granted = allowed"},{title:"Run",detail:"Execute, read diagnostics, then refine the smallest failing unit.",code:"check → compile → run → inspect"}]}
export const tutorials:Tutorial[]=tutorialNames.map(title=>({slug:slugify(title),title,summary:`Animated walkthrough: ${title}.`,steps:tutorialSteps(title)}));
export const glyphs=[["🏁","program entry"],["🧰","block open"],["🔒","block close"],["🔸","statement"],["🔹","argument"],["📦","variable"],["⬅️","assignment"],["🔢","number"],["📝…🛑","string"],["🤔","if"],["🙃","else"],["🔁","loop"],["🛠️","function"],["📞","call"],["↩️","return"],["📢","output"],["🛡️","capability"],["➕ ➖ ✖️ ➗","arithmetic"],["🟰 🚫🟰","equality"],["◀️ ▶️ 🔽 🔼","comparison"],["🤝 🔀 🚫","logical"]] as const;
export const stats={docs:docPages.length,tutorials:tutorials.length,examples:9,routes:docPages.length+tutorials.length+4};
