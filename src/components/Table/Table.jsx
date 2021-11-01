import React, { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner'
import * as styles from './Table.module.scss'
import { ASCENDING, DECENDING } from '../../constants/tableConstants'

const SortArrow = React.memo(({idx, sortBy, sortDirection}) => {
  if (idx === sortBy) {
    if (sortDirection === ASCENDING) {
      return '⬆'
    }
    if (sortDirection === DECENDING) {
      return '⬇'
    }
  }
  return ''
})

const Table = ({ headers, data, noDataMessage }) => {
  const [sortBy, setSortBy] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)

  if (data === null) {
    return <div className={styles.centerDiv}>
      <LoadingSpinner />
    </div>
  }

  if (!data.length) {
    return <div className={styles.centerDiv}>
      <h1>
        {noDataMessage}
      </h1>
    </div>
  }

  const getSortedData = () => {
    if (sortBy === null) {
      return data
    }
    return data.slice().sort((a,b) => {
      const x = a[sortBy]
      const y = b[sortBy]
      if (x === y) {
        return 0
      }
      if (sortDirection === ASCENDING) {
        return x < y ? -1 : 1; 
      } else {
        return x < y ? 1 : -1; 
      }
    })
  }

  const handleSortClick = idx => {
    if (sortBy === idx) {
      if (sortDirection === ASCENDING) {
        setSortDirection(DECENDING)
      } else {
        setSortBy(null)
        setSortDirection(null)
      }
    } else {
      setSortBy(idx)
      setSortDirection(ASCENDING)
    }
  }

  return <table className={styles.table}>
    <thead className={styles.header}>
      <tr className={styles.row}>
        {headers.map((header, idx) => <td key={header} className={styles.cell} onClick={() => handleSortClick(idx)}>
          {header} 
          <SortArrow idx={idx} sortBy={sortBy} sortDirection={sortDirection} />
        </td>)}
      </tr>
    </thead>
    <tbody>
      {getSortedData().map((row) => <tr key={row} className={styles.row}>
        {row.map(cell => <td key={cell} className={styles.cell}>{cell}</td>)}
      </tr>)}
    </tbody>
  </table>
}

export default Table