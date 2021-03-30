import React, { useState, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";

import styles from "./StickyChat.module.css";
import { Chat } from "./Chat";
import { useBoardGame } from "contexts/BoardGameContext";

export const StickyChat = React.memo(() => {
  const { player, players, chatMessages, sendChatMessage } = useBoardGame();
  const [open, setOpen] = useState(true);
  const [seenMessages, setSeenMessages] = useState(0);

  const authorFromSenderId = useCallback(
    (senderId) => {
      const player = players.find(({ id }) => id.toString() === senderId);
      if (!player) return null;
      const { uid, profile } = player;
      return {
        uid,
        name: profile.displayName,
      };
    },
    [players]
  );

  const messages = useMemo(
    () =>
      chatMessages
        .filter(({ payload: { type } }) => type === "Chat")
        .map(({ id, sender, payload: { text, timestamp, author } }) => ({
          id,
          author: authorFromSenderId(sender) || author,
          text,
          timestamp,
        })),
    [chatMessages, authorFromSenderId]
  );

  useEffect(() => {
    if (open) {
      setSeenMessages(messages.length);
    }
  }, [messages, open, setSeenMessages]);

  const unread = messages.length - seenMessages;

  const handleSend = useCallback(
    (text) => {
      sendChatMessage({
        type: "Chat",
        text,
        timestamp: new Date(),
        author: {
          uid: player.uid,
          name: player.profile.displayName,
        },
      });
    },
    [sendChatMessage, player.uid, player.profile]
  );

  const toggleChat = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      setSeenMessages(messages.length);
    }
  };

  return (
    <div className={styles.wrapper}>
      <span
        className={clsx(styles.triggerButton, { [styles.unread]: unread > 0 })}
        data-unread={unread}
        onClick={toggleChat}
      ></span>
      <div className={clsx(styles.popupChat, { [styles.collapsed]: !open })}>
        <Chat messages={messages} onSend={handleSend} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
});

StickyChat.displayName = "StickyChat";
