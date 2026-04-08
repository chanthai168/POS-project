import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "../css/table.module.css"
import { useAppContext } from '../../context/AppProvider'

const angleIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.121a1 1 0 0 1-.707-.293L7.05 10.586a1 1 0 0 1 1.414-1.414L12 12.707l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.242a1 1 0 0 1-.707.293"></path></svg>;

const CIRCLE_COLORS = [
  'circleRed', 'circlePink', 'circleYellow', 'circleBlue',
  'circleNavy', 'circleGreen', 'circlePurple', 'circleOrange',
]

const Icon = ({ size = 16, color = 'currentColor', path }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
)

const StarIcon   = (props) => <Icon {...props} path={<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />} />
const UsersIcon  = (props) => <Icon {...props} path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>} />
const PlusIcon   = (props) => <Icon {...props} path={<path d="M12 5v14M5 12h14" />} />
const XIcon      = (props) => <Icon {...props} path={<path d="M18 6L6 18M6 6l12 12" />} />
const PencilIcon = (props) => <Icon {...props} path={<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />} />
const TrashIcon  = (props) => <Icon {...props} path={<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />} />

// ─────────────────────────────────────────────
// Toggle Switch — click to toggle table status
// ─────────────────────────────────────────────

function ToggleSwitch({ isActive, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`${styles.toggle} ${isActive ? styles.toggleActive : ''}`}
      title={isActive ? 'Active — click to deactivate' : 'Inactive — click to activate'}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className={styles.statCard}>
      <div className='flex gap-2'>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.statValue}>{value}</div>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

function TypeBadge({ type }) {
  const modifier = type === 'VIP' ? styles.typeBadgeVip : styles.typeBadgeNormal
  return (
    <span className={`${styles.typeBadge} ${modifier}`}>
      {type === 'VIP' ? '♥ VIP' : 'Normal'}
    </span>
  )
}

function TableRow({ table, onDelete, onEdit, onToggle }) {
  return (
    <tr>
      <td className='flex justify-center'>
        <div className={`${styles.colorCircle} ${styles[table.color]}`}>
          {table.number}
        </div>
      </td>
      <td className='text-center'>{table.capacity}</td>
      <td className='text-center'>
        <ToggleSwitch isActive={table.status} onToggle={() => onToggle(table.id)} />
      </td>
      <td className='text-center'>
        <TypeBadge type={table.type} />
      </td>
      <td className='flex justify-center'>
        <div className={styles.tdActions}>
          <button className={styles.btnOutline} onClick={() => onEdit(table)}>
            <PencilIcon size={11} /> Edit
          </button>
          <button className={styles.btnIcon} onClick={() => onDelete(table.id)}>
            <TrashIcon size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ─────────────────────────────────────────────
// Edit Modal — edit existing table details
// ─────────────────────────────────────────────

function TableEditModal({ table, onClose, onSave, existingNumbers }) {
  const [form, setForm] = useState({
    number: String(table.number),
    capacity: String(table.capacity),
    status: table.status ? 'Active' : 'Disactive',
    type: table.type,
  })
  const [errors, setErrors] = useState({})

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.number) {
      newErrors.number = 'Table number is required'
    } else if (!/^\d+$/.test(form.number) || parseInt(form.number) <= 0) {
      newErrors.number = 'Must be a positive number'
    } else if (
      parseInt(form.number) !== table.number &&
      existingNumbers.includes(parseInt(form.number))
    ) {
      newErrors.number = `Table ${form.number} already exists`
    }
    if (!form.capacity) {
      newErrors.capacity = 'Capacity is required'
    } else if (!/^\d+$/.test(form.capacity) || parseInt(form.capacity) <= 0) {
      newErrors.capacity = 'Must be a positive number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave(table.id, {
      number:   parseInt(form.number),
      capacity: parseInt(form.capacity),
      status:   form.status === 'Active',
      type:     form.type,
    })
    onClose()
  }

  const statusPillClass = (option) => {
    if (form.status !== option) return styles.btnPill
    return `${styles.btnPill} ${option === 'Active' ? styles.btnPillStatusActive : styles.btnPillStatusDisactive}`
  }

  const typePillClass = (option) => {
    if (form.type !== option) return styles.btnPill
    return `${styles.btnPill} ${option === 'VIP' ? styles.btnPillVipActive : styles.btnPillNormalActive}`
  }

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalBox}>

        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Edit Table {table.number}</span>
          <button className={styles.modalCloseBtn} onClick={onClose}><XIcon size={13} /></button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Table number</label>
          <input
            className={`${styles.formInput} ${errors.number ? styles.formInputError : ''}`}
            placeholder="Ex: 4"
            value={form.number}
            onChange={(e) => set('number', e.target.value)}
          />
          {errors.number && <p className={styles.errorText}>{errors.number}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Table Capacity</label>
          <input
            className={`${styles.formInput} ${errors.capacity ? styles.formInputError : ''}`}
            placeholder="Ex: 4"
            value={form.capacity}
            onChange={(e) => set('capacity', e.target.value)}
          />
          {errors.capacity && <p className={styles.errorText}>{errors.capacity}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Status</label>
          <div className={styles.formRow}>
            {['Active', 'Disactive'].map(option => (
              <button key={option} className={statusPillClass(option)} onClick={() => set('status', option)}>{option}</button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Type</label>
          <div className={styles.formRow}>
            {['VIP', 'Normal'].map(option => (
              <button key={option} className={typePillClass(option)} onClick={() => set('type', option)}>{option}</button>
            ))}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
          <button className={styles.btnDark} onClick={handleSave}>Save Changes</button>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Create Modal
// ─────────────────────────────────────────────

const INITIAL_FORM = { number: '', capacity: '', status: 'Active', type: 'VIP' }

function TableCreationModal({ onClose, onSave, existingNumbers }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.number) {
      newErrors.number = 'Table number is required'
    } else if (!/^\d+$/.test(form.number) || parseInt(form.number) <= 0) {
      newErrors.number = 'Must be a positive number (e.g. 1, 2, 3)'
    } else if (existingNumbers.includes(parseInt(form.number))) {
      newErrors.number = `Table ${form.number} already exists`
    }
    if (!form.capacity) {
      newErrors.capacity = 'Capacity is required'
    } else if (!/^\d+$/.test(form.capacity) || parseInt(form.capacity) <= 0) {
      newErrors.capacity = 'Must be a positive number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave(form)
    onClose()
  }

  const statusPillClass = (option) => {
    if (form.status !== option) return styles.btnPill
    return `${styles.btnPill} ${option === 'Active' ? styles.btnPillStatusActive : styles.btnPillStatusDisactive}`
  }

  const typePillClass = (option) => {
    if (form.type !== option) return styles.btnPill
    return `${styles.btnPill} ${option === 'VIP' ? styles.btnPillVipActive : styles.btnPillNormalActive}`
  }

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalBox}>

        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Table Creation</span>
          <button className={styles.modalCloseBtn} onClick={onClose}><XIcon size={13} /></button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Table number</label>
          <input
            className={`${styles.formInput} ${errors.number ? styles.formInputError : ''}`}
            placeholder="Ex: 4"
            value={form.number}
            onChange={(e) => set('number', e.target.value)}
          />
          {errors.number && <p className={styles.errorText}>{errors.number}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Table Capacity</label>
          <input
            className={`${styles.formInput} ${errors.capacity ? styles.formInputError : ''}`}
            placeholder="Ex: 4"
            value={form.capacity}
            onChange={(e) => set('capacity', e.target.value)}
          />
          {errors.capacity && <p className={styles.errorText}>{errors.capacity}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Status</label>
          <div className={styles.formRow}>
            {['Active', 'Disactive'].map(option => (
              <button key={option} className={statusPillClass(option)} onClick={() => set('status', option)}>{option}</button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Type</label>
          <div className={styles.formRow}>
            {['VIP', 'Normal'].map(option => (
              <button key={option} className={typePillClass(option)} onClick={() => set('type', option)}>{option}</button>
            ))}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel Creation</button>
          <button className={styles.btnDark} onClick={handleSave}>Create Table</button>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function Table() {
  const { tables, setTables } = useAppContext();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTable, setEditingTable] = useState(null)
  const [filter, setFilter] = useState('All table')
  const [open, setOpen] = useState(false);

  const vipTables      = tables.filter(t => t.type === 'VIP')
  const normalTables   = tables.filter(t => t.type === 'Normal')
  const occupiedTables = tables.filter(t => t.status)
  const existingNumbers = tables.map(t => t.number)

  const handleDelete = (id) =>
    setTables(tables.filter(t => t.id !== id))

  const handleToggle = (id) =>
    setTables(tables.map(t => t.id === id ? { ...t, status: !t.status } : t))

  const handleCreate = (form) =>
    setTables([
      ...tables,
      {
        id:       Date.now(),
        number:   parseInt(form.number),
        capacity: parseInt(form.capacity),
        status:   form.status === 'Active',
        type:     form.type,
        color:    CIRCLE_COLORS[tables.length % CIRCLE_COLORS.length],
        order:    [],
        total:    0,
      },
    ])

  // Save edited table fields
  const handleSaveEdit = (id, updatedFields) => {
    setTables(tables.map(t => t.id === id ? { ...t, ...updatedFields } : t))
  }

  const filteredTables =
    filter === 'All table' ? tables : tables.filter(t => t.type === filter)

  const FILTERS_MODE = ["All table", "VIP", "Normal"]

  return (
    <div className={styles.page} style={{ fontFamily: "Manrope" }}>
      <h1 className={styles.pageTitle}>Table Overview</h1>

      <div className={styles.statsGrid}>
        <StatCard icon={<StarIcon size={20} color="#9c27b0" />} value={`${vipTables.filter(t => t.status).length}/${vipTables.length}`} label="VIP Table" />
        <StatCard icon={<UsersIcon size={20} color="#ff9800" />} value={`${normalTables.filter(t => t.status).length}/${normalTables.length}`} label="Normal Table" />
        <StatCard icon={<PlusIcon size={20} color="#2196f3" />} value={`${occupiedTables.length}/${tables.length}`} label="Table occupied" />
        <div className={styles.statCardCenter}>
          <button className={styles.btnCreateTable} onClick={() => setShowCreateModal(true)}>Create New Table</button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableCardHeader}>
          <span className={styles.tableCardTitle}>Table list</span>
          <div className="relative self-end">
            <button
              onClick={() => setOpen(p => !p)}
              className="flex items-center text-sm self-end bg-gray-200 rounded-4xl px-4 py-1.5 gap-1 active:scale-95 transition-transform"
            >
              {filter}
              <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>{angleIcon}</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 bg-white border border-white rounded-2xl shadow-md overflow-hidden z-10 w-32">
                {FILTERS_MODE.map(p => (
                  <button
                    key={p}
                    onClick={() => { setFilter(p); setOpen(false); }}
                    className={`w-full text-left px-4 border-b border-gray-200 py-2 text-sm hover:bg-gray-200 transition-colors ${filter === p ? "text-blue-500 font-medium" : "text-gray-700"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <table className={styles.dataTable}>
          <thead>
            <tr>
              {['#', 'Capacity', 'Status', 'Type', 'Action'].map(heading => (
                <th style={{ textAlign: "center" }} key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTables.map(table => (
              <TableRow
                key={table.id}
                table={table}
                onDelete={handleDelete}
                onEdit={setEditingTable}
                onToggle={handleToggle}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <TableCreationModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreate}
          existingNumbers={existingNumbers}
        />
      )}

      {/* Edit Modal */}
      {editingTable && (
        <TableEditModal
          table={editingTable}
          onClose={() => setEditingTable(null)}
          onSave={handleSaveEdit}
          existingNumbers={existingNumbers}
        />
      )}
    </div>
  )
}
