import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import { Segment, Comment, Icon, Input } from "semantic-ui-react";

import Avatar from "components/user/Avatar";

import styles from "./Chat.module.css";

export const propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.shape({
        uid: PropTypes.string,
        name: PropTypes.string.isRequired,
      }).isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func,
  onSend: PropTypes.func,
};

export const Chat = ({ messages, onSend, onClose }) => {
  const [text, setText] = useState("");
  const messagesList = useRef(null);

  useEffect(() => {
    messagesList.current.scrollTop = messagesList.current.scrollHeight;
  }, [messagesList, messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      onSend(text);
      setText("");
    }
  };

  return (
    <Segment.Group className={styles.chat}>
      <Segment compact className={styles.header}>
        Chat
        <span className={styles.closeIcon} onClick={onClose}>
          <Icon name="close" />
        </span>
      </Segment>
      <div className={`ui segment ${styles.messages}`} ref={messagesList}>
        <Comment.Group>
          {messages.map(({ id, author, text, timestamp }) => (
            <Comment key={id}>
              <div className={classNames("avatar", styles.avatar)}>
                <Avatar uid={author.uid} small />
              </div>
              <Comment.Content>
                <Comment.Author as="a">{author.name}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(timestamp).format("LTS")}</div>
                </Comment.Metadata>
                <Comment.Text>{text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </div>
      <Segment className={styles.inputBox}>
        <form onSubmit={handleSubmit}>
          <Input
            fluid
            icon="send"
            placeholder="Send message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </Segment>
    </Segment.Group>
  );
};

Chat.propTypes = propTypes;
