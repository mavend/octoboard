import React from "react";
import PropTypes from "prop-types";
import { Header, Progress } from "semantic-ui-react";
import { timerFormat } from "../utils/time";

const propTypes = {
  remainingSeconds: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
};

const Countdown = ({ remainingSeconds, totalTime }) => (
  <Header as="h3" attached="bottom" textAlign="center" style={{ padding: 0, paddingBottom: 11 }}>
    <Progress
      indicating
      percent={(100 * remainingSeconds) / totalTime}
      attached="top"
      style={{ marginBottom: 11, borderRadius: 0 }}
    />
    {timerFormat(remainingSeconds)}
  </Header>
);
Countdown.propTypes = propTypes;

export default Countdown;
