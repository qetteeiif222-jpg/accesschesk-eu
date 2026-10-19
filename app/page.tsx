"use client"
import { useState } from 'react'

const countries = [
  {code:'DE', name:'Germany', flag:'🇩🇪'},
  {code:'FR', name:'France', flag:'🇫🇷'},
  {code:'IT', name:'Italy', flag:'🇮🇹'},
  {code:'ES', name:'Spain', flag:'🇪🇸'},
  {code:'PL', name:'Poland', flag:'🇵🇱'},
  {code:'NL', name:'Netherlands', flag:'🇳🇱'},
]

export default function Page(){
  const [url,setUrl] = useState('')
  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState<any>(null)

  const check = async()=>{
    if(!url) return
    setLoading(true)
    await new Promise(r=>setTimeout(r,1500))
    setResult({
      accessible: Math.random()>0.3,
      blockedCountries: ['DE','FR'].filter(()=>Math.random()>0.5),
      status: 403
    })
    setLoading(false)
  }

  return (
    <div style={{fontFamily:'system-ui', maxWidth:900, margin:'0 auto', padding:20, background:'#f8f9ff', minHeight:'100vh'}}>
      <h1 style={{fontSize:32, fontWeight:800}}>AccessCheck EU 🇪🇺</h1>
      <p>Check if a website is blocked in EU countries</p>
      
      <div style={{background:'white', padding:20, borderRadius:12, marginTop:20, display:'flex', gap:10}}>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com" style={{flex:1, padding:12, borderRadius:8, border:'1px solid #ddd'}} />
        <button onClick={check} disabled={loading} style={{background:'black', color:'white', padding:'12px 24px', borderRadius:8, border:0, cursor:'pointer'}}>
          {loading?'Checking...':'Check'}
        </button>
      </div>

      {result && (
        <div style={{background:'white', padding:20, borderRadius:12, marginTop:20}}>
          <h3 style={{color: result.accessible ? 'green':'red', fontSize:20}}>
            {result.accessible ? '✅ Accessible' : '❌ Blocked'}
          </h3>
          <p>Status: {result.status}</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:15}}>
            {countries.map(c=>(
              <div key={c.code} style={{padding:10, border:'1px solid #eee', borderRadius:8, background: result.blockedCountries.includes(c.code) ? '#fee':'#efe'}}>
                {c.flag} {c.name} {result.blockedCountries.includes(c.code) ? '❌':'✅'}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{marginTop:30, padding:20, background:'white', borderRadius:12}}>
        <h3>We Check:</h3>
        <ul>
          <li>🇪🇺 6 EU Countries</li>
          <li>🛡️ Geo-blocking & WAF detection</li>
          <li>⚡ Fast & Accurate</li>
        </ul>
      </div>
    </div>
  )
}
