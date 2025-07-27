import styles from "./Button.module.css"

const Button = ({isOutline, icon, text, onClick, type, disabled, className}) => {
  return (
    <button
      className={`${isOutline ? styles.outline_btn : styles.primary_btn} ${className || ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon}{text}
    </button>
  )
}

export default Button
