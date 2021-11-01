import React from 'react'
import * as styles from './Card.module.scss'

const Card = ({ name, address1, address2, sqft, isOccupied, baseRent, onClick }) => {
  const rent = Number(baseRent.slice(1).replace(',', ''))
  const sqftMonth = (rent / sqft).toFixed(2)
  const sqftYear = (sqftMonth * 12).toFixed(2)
  return <div className={styles.card} onClick={onClick}>
    <div className={styles.header}>
      <h2>{name}</h2>
    </div>
    <div className={styles.details} >
      <div className={styles.lineOne}>
        <h3>{address1}</h3>
        <h3>{baseRent}</h3>
      </div>
      <div className={styles.lineTwo}>
        <h3>{address2}</h3>
      </div>
      <div className={styles.lineThree}>
        <h3>{sqft} sqft.</h3>
        <h3>${sqftMonth} sqft/mo</h3>
        <h3>${sqftYear} sqft/year</h3>
      </div>
    </div>
  </div>
}

export default Card