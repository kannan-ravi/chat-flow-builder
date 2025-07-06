type propsType = {
  children: React.ReactNode
  type: "button" | "submit" | "reset"
  color: "primary" | "secondary" | "light"
  size: "small" | "medium" | "large"
}

function Button({ children, type, color, size }: propsType) {
  const colors = {
    primary: "bg-black text-white",
    secondary: "bg-white text-black",
    light: "bg-gray-200 text-black border-gray-200",
  }

  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-5 py-1.5 text-base",
    large: "px-7 py-2 text-lg",
  }
  return (
    <button
      type={type}
      className={`border cursor-pointer transition duration-300 outline-0 ${colors[color]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}

export default Button
