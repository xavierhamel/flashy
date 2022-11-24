import styles from '../styles/Main.module.css'

interface CardProps {
  title?: string;
  subtitle?: string;
  subsubtitle?: string;
  children?: JSX.Element[] | JSX.Element;
  onClick?: () => void;
}

export const Card = ({
  title,
  subtitle,
  subsubtitle,
  children,
  onClick
}: CardProps) => {
  return (
    <div
      className={[styles.card, onClick ? styles.pointer : null].join(' ')}
      onClick={onClick}>
      {!!title && <h2>{title}</h2>}
      {(!!subtitle || !!subsubtitle) && (
        <div className={[styles.row, styles.spaceBetween].join(' ')}>
          {!!subtitle && <h4>{subtitle}</h4>}
          {!!subsubtitle && <h4>{subsubtitle}</h4>}
        </div>
      )}
      {children}
    </div>
  )
};
