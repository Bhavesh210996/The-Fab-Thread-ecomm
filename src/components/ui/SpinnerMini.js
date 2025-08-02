import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerStyle = styled(BiLoaderAlt)`
  color: #ff3f6c;
  width: 1rem;
  height: 1rem;
  animation: ${rotate} 1.5s infinite linear;
`;

const SpinnerMini = () => {
  return(
    <SpinnerStyle data-testid="spinnerMini" />
  )
}
export default SpinnerMini;
