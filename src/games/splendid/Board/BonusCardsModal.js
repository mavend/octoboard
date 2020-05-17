import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";
import { BonusCard } from "../GameCard";

import styles from "./Board.module.css";

const propTypes = {
  open: PropTypes.bool,
  bonuses: PropTypes.array,
  onTake: PropTypes.func,
};

const BonusCardsModal = ({ open, bonuses, onTake }) => {
  return (
    <Modal open={open} style={{ width: "auto" }}>
      <Modal.Header>
        <span role="img" aria-label="Yay">
          🎉
        </span>{" "}
        Select one bonus
      </Modal.Header>
      <Modal.Content>
        <div className={styles.bonusesModal}>
          {(bonuses || []).map(({ id, points, img, cost }) => (
            <BonusCard key={id} points={points} img={img} cost={cost} onClick={() => onTake(id)} />
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
};

BonusCardsModal.propTypes = propTypes;

export default BonusCardsModal;
