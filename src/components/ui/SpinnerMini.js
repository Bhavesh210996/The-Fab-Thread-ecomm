import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  color: #ff3f6c;
  width: 1rem;
  height: 1rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
