function Spinner({type}){
  let style;
  if(type === "delete"){
    style = {
      position: "absolute",
      top: "-120px",
      left: "192px"
    }
  }
  if(type === "login"){
    style = {
      position: "absolute",
      top: "-63px",
      left: "204px"
    }
  }
  if(type === "signup"){
    style = {
      position: "absolute",
      top: "-63px",
      left: "178px"
    }
  }
  if(type === "address"){
    style = {
      position: "absolute",
      left: "192px"
    }
  }
  return(
    <div className="spinner" data-testid="spinner" style={style}></div>
  )
}
export default Spinner;
