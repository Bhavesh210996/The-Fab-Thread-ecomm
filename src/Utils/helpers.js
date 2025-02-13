import FileResizer from "react-image-file-resizer";

export const formatCurrency = (value) =>
    new Intl.NumberFormat('en', { style: 'currency', currency: 'INR' }).format(
      value
    );

export const emailValidationFn = (sibling, value) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailRegex.test(value)){
      if(sibling) sibling.classList.remove("hide");
      sibling.innerText = "Please provide valid email id"
  }
}

export const passwordValidationFn = (sibling, value, setPassword) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if(!passwordRegex.test(value)){
      if(sibling) sibling.classList.remove("hide");
      sibling.innerText = "Please use password with min length of 8 including special char"
  }else{
      setPassword(value);
  }
}


export function resizeImage(file, callback) {
  FileResizer.imageFileResizer(
    file,            // input file
    800,             // max width
    600,             // max height
    'JPEG',          // output format
    70,              // quality (0-100)
    0,               // rotation (0, 90, 180, 270)
    (uri) => {
      // The resized image will be passed to the callback
      callback(uri);
    },
    'base64'         // output type (can be 'base64', 'blob', etc.)
  );
}
