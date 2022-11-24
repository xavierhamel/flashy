interface ButtonProps {
  children: JSX.Element | string;
  onClick: () => void;
  variant?: keyof typeof VARIANT;
}

const VARIANT = {
  dark: '#1E1E1E',
  light: '#333333',
  primary: 'red',
}

export const Button = ({children, onClick, variant = 'primary'}: ButtonProps) => {
  const handler = (event: React.MouseEvent) => {
    onClick();
  }
  return (
    <button
      onClick={(e) => handler(e)}
      style={{backgroundColor: VARIANT[variant]}}>
      {children}
    </button>
  )
}
