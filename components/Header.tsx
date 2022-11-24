import styles from '../styles/Main.module.css'

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  progress?: number;
}

export const Header = ({onBack, title, subtitle, progress}: HeaderProps) => {
  return (
    <div className={styles.header}>
      {onBack && (
        <div
          className={styles.back}
          onClick={onBack}>
          {"⟵"}
        </div>
      )}
      {!!subtitle && <h3>{subtitle}</h3>}
      {!!title && <h1>{title}</h1>}
      {progress !== undefined && (
        <div className={styles.progressContainer}>
          <div
            className={styles.progress}
            style={{width: `${progress * 100}%`}}
          />
        </div>
      )}
    </div>
  )
};
