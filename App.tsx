import { useState } from 'react'

// Soul Engine – MVP Prototype (single-file React)
// Tailwind only, no external UI libs

type Route =
  | 'home'
  | 'crea'
  | 'centrarmi'
  | 'parlami'
  | 'diario'
  | 'crea_per'
  | 'mappatura_se'
  | 'mappatura_terzi'
  | 'analisi_energetica'

export default function App() {
  const [route, setRoute] = useState<Route>('home')
  const [showVarco, setShowVarco] = useState(false)
  const [showStopVivo, setShowStopVivo] = useState(false)
  const [guidami, setGuidami] = useState<null | 'mantra' | 'micro' | 'gesto'>(null)

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header onOpenVarco={() => setShowVarco(true)} onOpenDiario={() => setRoute('diario')} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {route === 'home' && <Home setRoute={setRoute} />}
        {route === 'crea' && <Crea setRoute={setRoute} onStopVivo={() => setShowStopVivo(true)} />}
        {route === 'centrarmi' && <Centrarmi onOpenVarco={() => setShowVarco(true)} />}
        {route === 'parlami' && <Parlami onGuidami={(k) => setGuidami(k)} guidami={guidami} />}
        {route === 'diario' && <Diario />}
        {route === 'crea_per' && <CreaPer setRoute={setRoute} />}
        {route === 'mappatura_se' && <MappaturaSe />}
        {route === 'mappatura_terzi' && <MappaturaTerzi />}
        {route === 'analisi_energetica' && <AnalisiEnergetica />}
      </main>

      {showVarco && <VarcoMorbido onClose={() => setShowVarco(false)} />}
      {showStopVivo && <StopVivo onClose={() => setShowStopVivo(false)} />}
    </div>
  )
}

function Header({ onOpenVarco, onOpenDiario }: { onOpenVarco: () => void; onOpenDiario: () => void }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌀</span>
          <h1 className="text-xl font-semibold">Soul Engine</h1>
          <span className="text-sm text-neutral-500 ml-2">MVP Prototype</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenDiario} className="px-3 py-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-100">📔 Diario del Cuore</button>
          <button onClick={onOpenVarco} className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800">🪶 Varco Morbido</button>
        </div>
      </div>
    </header>
  )
}

function Home({ setRoute }: { setRoute: (r: Route) => void }) {
  const cards = [
    { key: 'crea', title: 'Voglio creare', desc: 'Inizia un contenuto. Prima domanda: per te o per qualcun altro?', icon: '✨' },
    { key: 'centrarmi', title: 'Prima voglio centrarmi', desc: 'Regola il sistema nervoso, torna al corpo e al sentire.', icon: '🧘' },
    { key: 'parlami', title: 'Vorrei parlare di me', desc: 'Attiva lo specchio: ti aiuto a vedere cosa sta accadendo in te.', icon: '🪞' },
  ] as const

  return (
    <section>
      <p className="text-neutral-600 mb-4">Cosa senti in questo momento?</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <button
            key={c.key}
            onClick={() => setRoute(c.key as Route)}
            className="text-left p-5 rounded-2xl border border-neutral-200 hover:shadow-md hover:bg-white transition"
          >
            <div className="text-3xl mb-2">{c.icon}</div>
            <h2 className="font-semibold text-lg mb-1">{c.title}</h2>
            <p className="text-sm text-neutral-600">{c.desc}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

function Crea({ setRoute, onStopVivo }: { setRoute: (r: Route) => void; onStopVivo: () => void }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Stai creando questo contenuto per te o per qualcun altro?</h2>
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white" onClick={() => setRoute('mappatura_se')}>Per me</button>
        <button className="px-4 py-2 rounded-xl border border-neutral-300" onClick={() => setRoute('mappatura_terzi')}>Per qualcun altro</button>
        <button className="px-4 py-2 rounded-xl border border-neutral-300" onClick={() => setRoute('crea_per')}>Ho già una mappatura salvata</button>
        <button className="px-4 py-2 rounded-xl border border-dashed" onClick={onStopVivo}>STOP VIVO – Sospensione percettiva</button>
      </div>
    </section>
  )
}

function CreaPer({ setRoute }: { setRoute: (r: Route) => void }) {
  const demoProfiles = [
    { name: 'Aferdita – Sé (DEMO)', tag: 'Mappatura completa' },
    { name: 'Cliente Demo – Parrucchiera', tag: 'Servizi ricci / erbe / schiariture' },
  ]
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Seleziona un comunicante salvato</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {demoProfiles.map((p) => (
          <button key={p.name} onClick={() => setRoute('analisi_energetica')} className="p-4 border rounded-2xl text-left hover:bg-white">
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-neutral-500">{p.tag}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

function MappaturaSe() {
  return (
    <Card title="Mappatura Iniziale – Sé">
      <ListItem label="Chi sei davvero" hint="valori, momenti di autenticità" defaultValue={'Verità, cura, presenza. Mi sento vera quando scrivo senza filtri.'} />
      <ListItem label="Cosa ti blocca o ti fa paura" hint="giudizio, visibilità, errore" extra={<GuidamiToggle />} defaultValue={'Paura di essere fraintesa. Timore di “non essere pronta”.'} />
      <ListItem label="Credenze limitanti" hint="frasi automatiche" defaultValue={'“Da sola non ce la faccio”. “Non ho niente da dire”.'} />
      <ListItem label="Cosa vuoi davvero dire" hint="visione, verità taciute, messaggi" defaultValue={'Portare le persone a sentire prima di parlare. Niente CTA, solo varchi attivi.'} />
      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white">Salva mappatura</button>
        <button className="px-4 py-2 rounded-xl border">Prosegui → Analisi Energetica</button>
      </div>
    </Card>
  )
}

function MappaturaTerzi() {
  return (
    <Card title="Mappatura Iniziale – Per Terzi (Demo)">
      <ListItem label="Identità del cliente" hint="valori, ciò che è davvero" defaultValue={'“Giungla”, verde, piante. Cura e naturalezza.'} />
      <ListItem label="Paure / Resistenze" hint="esposizione, giudizio, invidia" extra={<GuidamiToggle />} defaultValue={'Parlare in video. Paura del giudizio dei colleghi.'} />
      <ListItem label="Pubblico di riferimento" hint="mercato, bisogni, esempi" defaultValue={'Donne 35–65, benessere, ricci, visione vegetale, qualità.'} />
      <ListItem label="Messaggio autentico" hint="ciò che conta davvero" defaultValue={'Spazio dove puoi essere te stessa senza sforzo. Il vero bene della cliente.'} />
      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white">Salva mappatura</button>
        <button className="px-4 py-2 rounded-xl border">Prosegui → Analisi Energetica</button>
      </div>
    </Card>
  )
}

function AnalisiEnergetica() {
  return (
    <Card title="Analisi Energetica (obbligatoria) – Demo">
      <ListItem label="Ferita attivata" hint="rifiuto, abbandono, ingiustizia…" defaultValue={'Abbandono (bisogno di presenza)'} />
      <ListItem label="Maschera presente" hint="controllo, compiacere, invisibilità…" defaultValue={'Controllo / Compiacere'} />
      <ListItem label="Chakra coinvolto" hint="radice, plesso, cuore…" defaultValue={'Cuore / Plesso'} />
      <ListItem label="Bisogno sensoriale" hint="tatto, suono, respiro, ritmo…" defaultValue={'Suono e respiro: 4-4, mantra silenzioso'} />
      <ListItem label="Plastic words (da evitare)" hint="lista personale e trigger" defaultValue={'Olistico, trasformazione, rivoluzionario'} />
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white">Salva lettura</button>
        <button className="px-4 py-2 rounded-xl border">Apri modulo creativo → Carosello IG</button>
      </div>
    </Card>
  )
}

function Centrarmi({ onOpenVarco }: { onOpenVarco: () => void }) {
  return (
    <Card title="Centratura rapida">
      <p className="text-sm text-neutral-600 mb-3">Scegli una via percettiva. Torna quando vuoi.</p>
      <div className="grid sm:grid-cols-3 gap-3">
        <MiniCard title="Mantra silenzioso" desc="2–3 min" onClick={onOpenVarco} />
        <MiniCard title="Micro-meditazione" desc="1–2 min" onClick={onOpenVarco} />
        <MiniCard title="Gesto sensoriale" desc="rituale veloce" onClick={onOpenVarco} />
      </div>
    </Card>
  )
}

function Parlami({ onGuidami, guidami }: { onGuidami: (k: any) => void; guidami: any }) {
  return (
    <Card title="Parlami di me (Specchio)">
      <div className="space-y-3">
        <TextQ label="Cosa sta accadendo ora in te?" />
        <TextQ label="Dove si è fermato il respiro?" helper="Domanda percettiva" />
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3 py-1.5 rounded-xl border" onClick={() => onGuidami('mantra')}>Non lo so / Guidami</button>
          <span className="text-xs text-neutral-500">Ti propongo 3 vie: mantra, micro, gesto</span>
        </div>
        {guidami && (
          <div className="p-3 rounded-xl bg-neutral-100 border text-sm">
            {guidami === 'mantra' && (
              <ul className="list-disc pl-5 space-y-1">
                <li>Ascolta 2 minuti di silenzio guidato (So Hum).</li>
                <li>Conta 4-4: inspira 4, espira 4, per 10 cicli.</li>
                <li>Nota una parola che emerge. Scrivila qui sotto.</li>
              </ul>
            )}
            {guidami === 'micro' && (
              <ul className="list-disc pl-5 space-y-1">
                <li>Chiudi gli occhi. Porta una mano al petto.</li>
                <li>Respira basso. Lascia cadere le spalle.</li>
                <li>Annota: cosa chiedono oggi le tue spalle?</li>
              </ul>
            )}
            {guidami === 'gesto' && (
              <ul className="list-disc pl-5 space-y-1">
                <li>Tocca qualcosa di caldo. Nota la trama.</li>
                <li>Cammina 30 passi lentissimi.</li>
                <li>Scrivi una sola frase vera adesso.</li>
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white">Mostrami lo specchio</button>
      </div>
    </Card>
  )
}

function Diario() {
  const demo = [
    { t: 'Lo specchio del giorno', s: 'in gestazione' },
    { t: 'Saturazione → Senso', s: 'pronta a crescere' },
    { t: 'Varco attivo (no CTA)', s: 'già fiorita' },
    { t: 'Accaduto vero – mare', s: 'in gestazione' },
  ]
  return (
    <Card title="Diario del Cuore">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-neutral-600">Custodisci intuizioni, frasi-seme, accaduti veri.</p>
        <button className="px-3 py-1.5 rounded-xl border">+ Nuova voce</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {demo.map((v, i) => (
          <div key={i} className="p-4 rounded-2xl border bg-white">
            <div className="font-medium">{v.t}</div>
            <div className="text-xs text-neutral-500">Stato: {v.s}</div>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1.5 rounded-xl border">Torna a questo seme</button>
              <button className="px-3 py-1.5 rounded-xl border">Rendi visibile</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function VarcoMorbido({ onClose }: { onClose: () => void }) {
  const items = [
    { title: 'Mantra silenzioso', lines: ['OM / So Hum', '2–3 minuti', 'Resta nel corpo'] },
    { title: 'Micro-meditazione', lines: ['Respiro 4-4', 'Spalle giù', 'Occhi morbidi'] },
    { title: 'Gesto sensoriale', lines: ['Tocca qualcosa di caldo', 'Cammina piano', 'Scrivi una parola'] },
  ]
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4 border shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">🪶 Varco Morbido</h3>
          <button onClick={onClose} className="px-3 py-1.5 rounded-xl border">Chiudi</button>
        </div>
        <p className="text-sm text-neutral-600 mt-1 mb-3">Scegli un varco. Nessun obbligo. Torna quando senti.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {items.map((it) => (
            <div key={it.title} className="p-4 rounded-2xl border">
              <div className="font-medium">{it.title}</div>
              <ul className="text-sm text-neutral-600 mt-2 list-disc pl-5 space-y-1">
                {it.lines.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-neutral-500">“Adesso, se vuoi, puoi tornare. Oppure restare ancora un po’ in te.”</div>
      </div>
    </div>
  )
}

function StopVivo({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-4 border shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">STOP VIVO – Sospensione percettiva</h3>
          <button onClick={onClose} className="px-3 py-1.5 rounded-xl border">Chiudi</button>
        </div>
        <p className="text-sm text-neutral-600 mt-2">Sembra che tu stia correndo. Vuoi rientrare nel corpo prima di continuare?</p>
        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          <MiniCard title="Respiro 4-2-6" desc="10 cicli" />
          <MiniCard title="Spalle giù" desc="sciogli la mandibola" />
          <MiniCard title="Una parola vera" desc="scrivila qui" />
        </div>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: any }) {
  return (
    <section className="p-5 rounded-2xl border bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </section>
  )
}

function MiniCard({ title, desc, onClick }: { title: string; desc?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="text-left p-4 rounded-2xl border hover:bg-neutral-50">
      <div className="font-medium">{title}</div>
      {desc && <div className="text-xs text-neutral-500">{desc}</div>}
    </button>
  )
}

function ListItem({ label, hint, extra, defaultValue }: { label: string; hint?: string; extra?: any; defaultValue?: string }) {
  return (
    <div className="p-3 rounded-xl border mb-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{label}</div>
          {hint && <div className="text-xs text-neutral-500">{hint}</div>}
        </div>
        {extra}
      </div>
      <textarea className="mt-2 w-full rounded-xl border p-2 text-sm" rows={3} placeholder="Scrivi qui…" defaultValue={defaultValue} />
    </div>
  )
}

function TextQ({ label, helper }: { label: string; helper?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {helper && <div className="text-xs text-neutral-500">{helper}</div>}
      <textarea className="mt-1 w-full rounded-xl border p-2 text-sm" rows={3} placeholder="Scrivi qui…" />
    </div>
  )
}

function GuidamiToggle() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center gap-2">
      <button className="px-3 py-1.5 rounded-xl border" onClick={() => setOpen(!open)}>
        {open ? 'Nascondi guida' : 'Non lo so / Guidami'}
      </button>
      {open && (
        <div className="text-xs text-neutral-600">
          Spunti: 1) Dove si ferma il respiro? 2) Cosa stringi? 3) Se il gesto fosse semplice, qual è il prossimo più vero?
        </div>
      )}
    </div>
  )
}
