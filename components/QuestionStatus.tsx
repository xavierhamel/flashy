import { useState } from 'react'
import styles from '../styles/Main.module.css'

export const QuestionStatus = () => {
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  return (
    <div className={styles.statusContainer}>
      <div className={styles.status}>
        <div 
          className={[styles.statusButton, status === 'error' && styles.statusError].join(' ')}
          onClick={() => setStatus('error')}>
          À revoir
        </div>
        <div
          className={[styles.statusButton, status === 'success' && styles.statusSuccess].join(' ')}
          onClick={() => setStatus('success')}>
          Excellent
        </div>
      </div>
    </div>
  )
}
