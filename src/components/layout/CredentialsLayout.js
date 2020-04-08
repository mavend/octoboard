import React from "react";
import { string, object } from "prop-types";
import { Modal, Image, Header, Responsive } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const propTypes = {
  action: string.isRequired,
  modalOptions: object,
};

const CredentialsLayout = ({ action, modalOptions, children, ...props }) => {
  const { t } = useTranslation("credentials");

  return (
    <Modal
      open={true}
      {...modalOptions}
      centered={window.innerWidth > Responsive.onlyTablet.maxWidth}
    >
      <Modal.Header>{t(`${action}.title`)}</Modal.Header>
      <Modal.Content image>
        <Responsive
          as={Image}
          minWidth={Responsive.onlyComputer.minWidth}
          wrapped
          size="medium"
          src="/images/game-hugo.png"
        />
        <Modal.Description style={{ flex: "1 0 auto" }}>
          <Header>{t(`${action}.prompt`)}</Header>
          {children}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

CredentialsLayout.propTypes = propTypes;

export default CredentialsLayout;
