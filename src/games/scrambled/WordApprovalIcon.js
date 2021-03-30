import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import { availableLaguages } from "./data/tiles";
import { useBoardGame } from "contexts/BoardGameContext";

const propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedIn: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const WordApprovalIcon = ({ letters, checkedIn }) => {
  const {
    G: { language, assist },
  } = useBoardGame();
  const currentLanguage = availableLaguages.find(({ key }) => key === language);

  if (!checkedIn.includes(assist) || letters.length > 3)
    return <Icon name="circle dot outline" color="blue" />;

  if (currentLanguage.shorts.includes(letters.join(""))) {
    return <Icon name="check circle" color="green" />;
  } else {
    return <Icon name="remove circle" color="red" />;
  }
};

WordApprovalIcon.propTypes = propTypes;
export default WordApprovalIcon;
