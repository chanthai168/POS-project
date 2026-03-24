import { useState } from 'react'
import styles from './css/table.module.css'

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const CIRCLE_COLORS = [
  'circleRed',
  'circlePink',
  'circleYellow',
  'circleBlue',
  'circleNavy',
  'circleGreen',
  'circlePurple',
  'circleOrange',
]

const INITIAL_TABLES = [
  { id: 1, number: 1, capacity: 4, status: true,  type: 'VIP',    color: 'circleRed'    },
  { id: 2, number: 2, capacity: 4, status: true,  type: 'VIP',    color: 'circlePink'   },
  { id: 3, number: 3, capacity: 4, status: true,  type: 'VIP',    color: 'circleYellow' },
  { id: 4, number: 4, capacity: 4, status: false, type: 'VIP',    color: 'circleBlue'   },
  { id: 5, number: 5, capacity: 4, status: false, type: 'Normal', color: 'circleNavy'   },
  { id: 6, number: 6, capacity: 6, status: true,  type: 'Normal', color: 'circleGreen'  },
  { id: 7, number: 7, capacity: 2, status: false, type: 'Normal', color: 'circlePurple' },
]

// ─────────────────────────────────────────────
// Icon Components
// ─────────────────────────────────────────────

const Icon = ({ size = 16, color = 'currentColor', path }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
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
// Sub-components
// ─────────────────────────────────────────────

function StatCard({ icon, value, label }) {
  return (
    <div className={styles.statCard}>
      {icon}
      <div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  )
}

function ToggleSwitch({ isActive, onToggle }) {
  return (
    <button
      className={`${styles.toggle} ${isActive ? styles.toggleActive : ''}`}
      onClick={onToggle}
    >
      <span className={styles.toggleThumb} />
    </button>
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

function TableRow({ table, onToggle, onDelete }) {
  return (
    <tr>
      <td>
        <div className={`${styles.colorCircle} ${styles[table.color]}`}>
          {table.number}
        </div>
      </td>
      <td>{table.capacity}</td>
      <td>
        <ToggleSwitch isActive={table.status} onToggle={() => onToggle(table.id)} />
      </td>
      <td>
        <TypeBadge type={table.type} />
      </td>
      <td>
        <div className={styles.tdActions}>
          <button className={styles.btnOutline}>
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
// Modal
// ─────────────────────────────────────────────

const INITIAL_FORM = { number: '', capacity: '', status: 'Active', type: 'VIP' }

function TableCreationModal({ onClose, onSave }) {
  const [form, setForm] = useState(INITIAL_FORM)

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = () => {
    if (!form.number || !form.capacity) return
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
    <div
      className={styles.modalOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modalBox}>

        {/* Header */}
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Table Creation</span>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <XIcon size={13} />
          </button>
        </div>

        {/* Table Number */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Table number</label>
          <input
            className={styles.formInput}
            placeholder="Ex: 4"
            value={form.number}
            onChange={(e) => set('number', e.target.value)}
          />
        </div>

        {/* Capacity */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Table Capacity</label>
          <input
            className={styles.formInput}
            placeholder="Ex: 4"
            value={form.capacity}
            onChange={(e) => set('capacity', e.target.value)}
          />
        </div>

        {/* Status */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Status</label>
          <div className={styles.formRow}>
            {['Active', 'Disactive'].map((option) => (
              <button
                key={option}
                className={statusPillClass(option)}
                onClick={() => set('status', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Type</label>
          <div className={styles.formRow}>
            {['VIP', 'Normal'].map((option) => (
              <button
                key={option}
                className={typePillClass(option)}
                onClick={() => set('type', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
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
  const [tables, setTables]       = useState(INITIAL_TABLES)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter]       = useState('All table')

  // Derived counts
  const vipTables      = tables.filter((t) => t.type === 'VIP')
  const normalTables   = tables.filter((t) => t.type === 'Normal')
  const occupiedTables = tables.filter((t) => t.status)

  // Handlers
  const handleToggleStatus = (id) =>
    setTables(tables.map((t) => (t.id === id ? { ...t, status: !t.status } : t)))

  const handleDelete = (id) =>
    setTables(tables.filter((t) => t.id !== id))

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
      },
    ])

  const filteredTables =
    filter === 'All table'
      ? tables
      : tables.filter((t) => t.type === filter)

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Table Overview</h1>

      {/* ── Stats ── */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={<StarIcon size={20} color="#9c27b0" />}
          value={`${vipTables.filter((t) => t.status).length}/${vipTables.length}`}
          label="VIP Table"
        />
        <StatCard
          icon={<UsersIcon size={20} color="#ff9800" />}
          value={`${normalTables.filter((t) => t.status).length}/${normalTables.length}`}
          label="Normal Table"
        />
        <StatCard
          icon={<PlusIcon size={20} color="#2196f3" />}
          value={`${occupiedTables.length}/${tables.length}`}
          label="Table occupied"
        />
        <div className={styles.statCardCenter}>
          <button className={styles.btnCreateTable} onClick={() => setShowModal(true)}>
            + Create New Table
          </button>
        </div>
      </div>

      {/* ── Table List ── */}
      <div className={styles.tableCard}>
        <div className={styles.tableCardHeader}>
          <span className={styles.tableCardTitle}>Table list</span>
          <select
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All table</option>
            <option>VIP</option>
            <option>Normal</option>
          </select>
        </div>

        <table className={styles.dataTable}>
          <thead>
            <tr>
              {['Table number', 'Capacity', 'Status', 'Type', 'Action'].map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table) => (
              <TableRow
                key={table.id}
                table={table}
                onToggle={handleToggleStatus}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <TableCreationModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  )
}