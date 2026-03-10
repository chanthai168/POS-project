
import { useState } from 'react'

// Inline SVG icons - no package needed
const StarIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
const UsersIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const PlusIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)
const XIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)
const PencilIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)
const TrashIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </svg>
)

// Table data
const TABLES = [
  { id: 1, number: 1, capacity: 4, status: true,  type: 'VIP',    color: 'circle-red'    },
  { id: 2, number: 2, capacity: 4, status: true,  type: 'VIP',    color: 'circle-pink'   },
  { id: 3, number: 3, capacity: 4, status: true,  type: 'VIP',    color: 'circle-yellow' },
  { id: 4, number: 4, capacity: 4, status: false, type: 'VIP',    color: 'circle-blue'   },
  { id: 5, number: 5, capacity: 4, status: false, type: 'Normal', color: 'circle-navy'   },
  { id: 6, number: 6, capacity: 6, status: true,  type: 'Normal', color: 'circle-green'  },
  { id: 7, number: 7, capacity: 2, status: false, type: 'Normal', color: 'circle-purple' },
]

const CIRCLE_COLORS = ['circle-red','circle-pink','circle-yellow','circle-blue','circle-navy','circle-green','circle-purple','circle-orange']

function TableCreationModal({ onClose, onSave }) {
  const [form, setForm] = useState({ number: '', capacity: '', status: 'Active', type: 'VIP' })
  const handleSave = () => { if (!form.number || !form.capacity) return; onSave(form); onClose() }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.35)',backdropFilter:"blur(2px)", display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:'#fff', borderRadius:16, padding:28, width:'100%', maxWidth:440, boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <span style={{ fontWeight:700, fontSize:16 }}>Table Creation</span>
          <button onClick={onClose} style={{ background:'#fff0f0', border:'none', borderRadius:'50%', width:28, height:28, cursor:'pointer', color:'#f44336', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <XIcon size={13} />
          </button>
        </div>

        {[['Table number','number','Ex: 4'],['Table Capacity','capacity','Ex: 4']].map(([label, key, placeholder]) => (
          <div key={key} style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#888', marginBottom:6 }}>{label}</label>
            <input style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1.5px solid #e8e8e8', fontSize:13.5, outline:'none', background:'#fafafa', boxSizing:'border-box' }}
              placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
          </div>
        ))}

        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#888', marginBottom:6 }}>Status</label>
          <div style={{ display:'flex', gap:8 }}>
            {['Active','Disact'].map(s => (
              <button key={s} onClick={() => setForm({ ...form, status: s })}
                style={{ padding:'5px 16px', borderRadius:20, border:'2px solid transparent', fontWeight:600, fontSize:12, cursor:'pointer',
                  background: form.status === s ? '#4caf50' : '#f0f0f0',
                  color: form.status === s ? '#fff' : '#888' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#888', marginBottom:6 }}>Type</label>
          <div style={{ display:'flex', gap:8 }}>
            {['VIP','Normal'].map(t => (
              <button key={t} onClick={() => setForm({ ...form, type: t })}
                style={{ padding:'5px 16px', borderRadius:20, border:'2px solid transparent', fontWeight:600, fontSize:12, cursor:'pointer',
                  background: form.type === t ? (t === 'VIP' ? '#f3e5f5' : '#e8f5e9') : '#f0f0f0',
                  color: form.type === t ? (t === 'VIP' ? '#7b1fa2' : '#388e3c') : '#888',
                  borderColor: form.type === t ? (t === 'VIP' ? '#ce93d8' : '#a5d6a7') : 'transparent' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', gap:10, marginTop:8 }}>
          <button onClick={onClose} style={{ flex:1, padding:'9px 18px', borderRadius:30, border:'1.5px solid #e8e8e8', background:'transparent', fontWeight:600, fontSize:13, cursor:'pointer' }}>
            Cancel Creation
          </button>
          <button onClick={handleSave} style={{ flex:1, padding:'9px 18px', borderRadius:30, border:'none', background:'#1a1a1a', color:'#fff', fontWeight:600, fontSize:13, cursor:'pointer' }}>
            Create Table
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Table() {
  const [tables, setTables] = useState(TABLES)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('All table')

  const vip      = tables.filter(t => t.type === 'VIP')
  const normal   = tables.filter(t => t.type === 'Normal')
  const occupied = tables.filter(t => t.status)

  const handleToggle = id => setTables(tables.map(t => t.id === id ? { ...t, status: !t.status } : t))
  const handleDelete = id => setTables(tables.filter(t => t.id !== id))
  const handleSave   = form => setTables([...tables, {
    id: Date.now(),
    number: parseInt(form.number),
    capacity: parseInt(form.capacity),
    status: form.status === 'Active',
    type: form.type,
    color: CIRCLE_COLORS[tables.length % CIRCLE_COLORS.length],
  }])

  const filtered = filter === 'All table' ? tables : tables.filter(t => t.type === filter)

  const circleStyle = (color) => {
    const map = { 'circle-red':'#ef5350','circle-pink':'#ec407a','circle-yellow':'#ffc107','circle-blue':'#42a5f5','circle-navy':'#3949ab','circle-green':'#66bb6a','circle-purple':'#ab47bc','circle-orange':'#ffa726' }
    return { width:28, height:28, borderRadius:'50%', background: map[color] || '#999', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, fontWeight:700 }
  }

  return (
    <div style={{ padding:24, fontFamily:'sans-serif' }}>
      <h1 style={{ fontSize:20, fontWeight:700, marginBottom:20 }}>Table Overview</h1>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:18 }}>
        {[
          { icon: <StarIcon size={20} color="#9c27b0" />, value: `${vip.filter(t=>t.status).length}/${vip.length}`,    label: 'VIP Table' },
          { icon: <UsersIcon size={20} color="#ff9800" />, value: `${normal.filter(t=>t.status).length}/${normal.length}`, label: 'Normal Table' },
          { icon: <PlusIcon size={20} color="#2196f3" />,  value: `${occupied.length}/${tables.length}`,               label: 'Table occupied' },
        ].map((s, i) => (
          <div key={i} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:12 }}>
            {s.icon}
            <div>
              <div style={{ fontSize:22, fontWeight:700 }}>{s.value}</div>
              <div style={{ fontSize:12, color:'#888' }}>{s.label}</div>
            </div>
          </div>
        ))}
        <div style={{ background:'#fff', borderRadius:14, padding:'18px 20px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <button onClick={() => setShowModal(true)}
            style={{ width:'100%', padding:'9px 18px', borderRadius:30, border:'1.5px solid #e8e8e8', background:'transparent', fontWeight:600, fontSize:13, cursor:'pointer' }}>
            + Create New Table
          </button>
        </div>
      </div>

      {/* Table list */}
      <div style={{ background:'#fff', borderRadius:14, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <span style={{ fontWeight:700, fontSize:15 }}>Table list</span>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ padding:'7px 12px', borderRadius:20, border:'1.5px solid #e8e8e8', background:'#fff', fontSize:12.5, cursor:'pointer', outline:'none' }}>
            <option>All table</option>
            <option>VIP</option>
            <option>Normal</option>
          </select>
        </div>

        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
          <thead>
            <tr>
              {['Table number','Capacity','Status','Type','Action'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'10px 14px', fontSize:12, fontWeight:600, color:'#888', borderBottom:'1px solid #f0f0f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(table => (
              <tr key={table.id} style={{ borderBottom:'1px solid #f5f5f5' }}>
                <td style={{ padding:'12px 14px' }}>
                  <div style={circleStyle(table.color)}>{table.number}</div>
                </td>
                <td style={{ padding:'12px 14px' }}>{table.capacity}</td>
                <td style={{ padding:'12px 14px' }}>
                  <button onClick={() => handleToggle(table.id)}
                    style={{ width:38, height:22, borderRadius:11, border:'none', cursor:'pointer', position:'relative', background: table.status ? '#4caf50' : '#ddd', transition:'background 0.2s' }}>
                    <span style={{ position:'absolute', width:16, height:16, background:'#fff', borderRadius:'50%', top:3, left: table.status ? 19 : 3, transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.15)' }} />
                  </button>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:20, fontSize:11.5, fontWeight:600,
                    background: table.type === 'VIP' ? '#f3e5f5' : '#e8f5e9',
                    color: table.type === 'VIP' ? '#7b1fa2' : '#388e3c' }}>
                    {table.type === 'VIP' ? '♥ VIP' : 'Normal'}
                  </span>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <button style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'5px 12px', borderRadius:30, border:'1.5px solid #e8e8e8', background:'transparent', fontSize:12, fontWeight:600, cursor:'pointer' }}>
                      <PencilIcon size={11} /> Edit
                    </button>
                    <button onClick={() => handleDelete(table.id)}
                      style={{ background:'none', border:'none', cursor:'pointer', color:'#f44336' }}>
                      <TrashIcon size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <TableCreationModal onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  )
}