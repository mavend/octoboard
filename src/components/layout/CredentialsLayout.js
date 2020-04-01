import React from "react";
import { Modal, Image, Header } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import OtherLoginOptions from "components/user/LoginRedirections";

const CredentialsLayout = ({
  action,
  withLoginOptions,
  modalOptions,
  children,
  setError,
  setIsLoading,
  ...props
}) => {
  const { t } = useTranslation("credentials");

  return (
    <Modal open={true} {...modalOptions}>
      <Modal.Header>{t(`${action}.title`)}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>{t(`${action}.prompt`)}</Header>
          {React.cloneElement(children, { action, setError, setIsLoading, ...props })}
          {withLoginOptions && <OtherLoginOptions setError={setError} setLoading={setIsLoading} />}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CredentialsLayout;
