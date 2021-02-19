import React from "react";
import { string, object } from "prop-types";
import { Modal, Segment, Image, Header } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import Footer from "./Footer";
import LobbyPage from "views/lobby/LobbyPage";
import { breakpoints, Media } from "config/media";

const propTypes = {
  action: string.isRequired,
  modalOptions: object,
};

const CredentialsLayout = ({ action, modalOptions, children, ...props }) => {
  const { t } = useTranslation("credentials");

  return (
    <>
      <LobbyPage noRefetch />
      <Modal open={true} {...modalOptions} centered={window.innerWidth >= breakpoints.computer}>
        <Modal.Header>{t(`${action}.title`)}</Modal.Header>
        <Modal.Content image>
          <Image
            as={Media}
            greaterThanOrEqual="tablet"
            wrapped
            size="medium"
            style={{ alignSelf: "center" }}
            src="/images/hugo-upgrade.png"
          />
          <Modal.Description style={{ flex: "1 0 auto" }}>
            <Header>{t(`${action}.prompt`)}</Header>
            {children}
          </Modal.Description>
        </Modal.Content>
        <Segment basic secondary style={{ marginTop: 0 }}>
          <Footer />
        </Segment>
      </Modal>
    </>
  );
};

CredentialsLayout.propTypes = propTypes;

export default CredentialsLayout;
