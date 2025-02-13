function Input({type, name, placeholder, elRef, value, onChange}){
    return (
        <input type={type} className="add-input-field" name={name} placeholder={placeholder} ref={elRef} value={value} onChange={onChange}/>
    )
}

export default Input;