/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import Spinner from "./Spinner";

const StyledConfirmDelete = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal, spinner }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" size="small" onClick={() => onCloseModal()} disabled={disabled}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variation="danger" size="small" disabled={disabled}>
          Delete
        </Button>
      </div>
      {spinner && <Spinner type="delete" />}
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
