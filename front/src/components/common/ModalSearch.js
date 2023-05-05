/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

function ModalSearch({ searchResult, isSearched, setIsSearched, searchValue }) {
  const handleClose = () => setIsSearched(false);

  return (
    <Modal show={isSearched} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: '600' }}>{searchValue}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '20px' }}>
        <div>
          {searchResult.slice(0, 1).map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <p dangerouslySetInnerHTML={{ __html: result.title }} />
              <p dangerouslySetInnerHTML={{ __html: result.contents }} />
              <ButtonLink
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                바로가기
              </ButtonLink>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonCancel onClick={handleClose}>알겠어요</ButtonCancel>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSearch;

const ButtonLink = styled(Button)`
  border: solid 2px #6700e6;
  border-radius: 20px;

  height: 28px;

  background-color: #ffffff;
  color: #6700e6;

  padding: 0 12px;

  &:hover {
    background-color: #6700e6;
    border: solid 2px #6700e6;
  }
`;

const ButtonCancel = styled(Button)`
  border: solid 2px #1e1f20;
  border-radius: 20px;

  background-color: #ffffff;
  color: #1e1f20;

  &:hover {
    background-color: #cecece;
    border: solid 2px #1e1f20;
  }
`;
