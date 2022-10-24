import React, { createContext, useContext } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Col, Row, CenteredCol } from '../atoms';

export const ModalContent = createContext({
  showModal: (opts) => {
    // do nothing.
  },
  hideModal: () => {
    // do nothing.
  },
});

export const ModalProvider = ModalContent.Provider;
export const useModal = () => useContext(ModalContent);

const ModalForm = ({ isOpen, data, hideModal }) => {
  const {
    title = '',
    noWrapper = false,
    eventSubmit = null,
    showFooter = true,
    submitText = '',
    cancelText = '',
    className = '',
    bodyContent = '',
    showXButton = false,
  } = data || {};

  return (
    <Modal isOpen={isOpen} className={className}>
      {noWrapper ? (
        bodyContent({ hideModal })
      ) : (
        <>
          {title ? <ModalHeader>
            <Row>
              <Col md={11}>
                {title}
              </Col>
              {showXButton ? <CenteredCol md={1}>
                <Button color="secondary" onClick={() => hideModal()}>
                  X
                </Button>
              </CenteredCol> : ''}
            </Row>
          </ModalHeader> : ''}
          <ModalBody>{typeof bodyContent === 'string' ? bodyContent : bodyContent()}</ModalBody>
          {showFooter && (
            <ModalFooter>
              {submitText && (
                <Button
                  color="primary"
                  onClick={() => {
                    if (eventSubmit) eventSubmit();
                    hideModal();
                  }}
                >
                  {submitText}
                </Button>
              )}
              <Button color="secondary" onClick={() => hideModal()}>
                {cancelText}
              </Button>
            </ModalFooter>
          )}
        </>
      )}
    </Modal>
  );
};

export default ModalForm;
