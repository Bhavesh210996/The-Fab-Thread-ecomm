
function Button({children, disabled, onClick, type}) {
  let style;

  if(type === "cart"){
    style = {width: "100%", padding: "0.4rem 1.4rem"}
  }
  if(type === "pincode"){
    style = {
      padding: "0.9rem", 
      backgroundColor: "unset", 
      backgroundImage: "unset", 
      border: "1px solid #acacb8",
      display: "flex",
      justifyContent: "space-between",
      width: "50%",
      alignItems: "center"
    }
  }
  return (
    <button className="primary-btn" style={type ? style : {}} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button
