import styles from '../styles/Main.module.css'

interface ButtonProps {
  children: JSX.Element | string;
  onClick: () => void;
  variant?: keyof typeof VARIANT;
  disabled?: boolean;
}

const VARIANT = {
  dark: '#1E1E1E',
  light: '#333333',
  primary: 'red',
}

export const Button = ({children, onClick, variant = 'primary', disabled}: ButtonProps) => {
  const handler = (_: React.MouseEvent) => {
    onClick();
  }
  return (
    <button
      onClick={(e) => handler(e)}
      className={disabled ? styles.buttonDisabled : ''}
      style={{backgroundColor: VARIANT[variant]}}>
      {children}
    </button>
  )
}
