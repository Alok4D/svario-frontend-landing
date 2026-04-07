/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useChatWS.ts
//
// What this hook gives you:
// - WS connection (with auto-reconnect)
// - authenticate on open
// - dead-simple actions: sendToUser, sendToRoom, loadHistory, refreshChatList, markRead
// - per-room messages state, including "temp chats" for first DMs (user_<id>)
// - a roomIdByUser map so you can auto-upgrade temp chats once the server returns a real roomId
// - chatList is kept up to date (lastMessage) for sidebar reordering
//
// TL;DR: You can treat new DMs and existing rooms the same from your UI.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface Message {
  id: string;
  content: string;
  timestamp: string; // keep as string for UI; we'll parse only when sorting
  isOwn: boolean;
  senderId: string;
  senderName?: string;
  read?: boolean;
}

export interface ChatListItem {
  roomId: string; // can be a real roomId or a temp "user_<id>" before server resolves it
  peer: { id: string; name: string; avatar?: string | null };
  lastMessage?: { content: string; timestamp: string };
  unread: number;
}

type Incoming =
  | {
      type: "authenticated" | "authentication";
      status?: "success" | "failed";
      userId?: string;
    }
  | {
      type: "chat_list";
      items?: ChatListItem[];
      chatList?: any[];
      userId?: string;
    }
  | {
      type: "chat_history";
      roomId?: string;
      chatRoomId?: string;
      items?: any[];
      messages?: any[];
      history?: any[];
      chatHistory?: any[];
      page?: number;
      hasMore?: boolean;
    }
  | {
      type: "message";
      id?: string;
      roomId?: string;
      chatRoomId?: string;
      message?: string;
      content?: string;
      createdAt?: string;
      timestamp?: string;
      senderId?: string;
      receiverId?: string;
      senderName?: string;
      sender?: { fullName?: string };
      isOwn?: boolean;
      isRead?: boolean;
    }
  | { type: "message_read"; messageIds: string[] }
  | { type: "message_status"; messageId: string; status: "delivered" | "read" }
  | { type: "error"; code: string; message: string }
  | Record<string, any>;

type Outgoing =
  | { type: "authenticate"; token: string }
  | { type: "message"; receiverId?: string; roomId?: string; message: string }
  | { type: "chat_history"; roomId: string; page: number; limit: number }
  | { type: "chat_list" }
  | { type: "message_read"; messageIds: string[] };

type Options = { url: string; token: string | null };

// ---- small utils ----
const toUnix = (ts?: string) => (ts ? new Date(ts).getTime() || 0 : 0);

const upsertMsg = (arr: Message[], item: Message) => {
  const i = arr.findIndex((m) => m.id === item.id);
  if (i === -1) return [...arr, item];
  const copy = arr.slice();
  copy[i] = { ...copy[i], ...item };
  return copy;
};

export function useChatWS({ url, token }: Options) {
  // raw socket + helpers
  const wsRef = useRef<WebSocket | null>(null);
  const queueRef = useRef<Outgoing[]>([]);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  // basic connection state
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // core chat state
  const [messagesByRoom, setMessagesByRoom] = useState<
    Record<string, Message[]>
  >({});
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [hasMoreByRoom, setHasMoreByRoom] = useState<Record<string, boolean>>(
    {},
  );
  const [pageByRoom, setPageByRoom] = useState<Record<string, number>>({});
  const [roomIdByUser, setRoomIdByUser] = useState<Record<string, string>>({}); // userId -> roomId

  // Clear messages state when reconnecting to prevent contamination
  const clearChatState = useCallback(() => {
    setMessagesByRoom({});
    setRoomIdByUser({});
    // Cleared chat state to prevent message mixing between sessions
  }, []);

  // send helper (queues if socket not open yet)
  const send = useCallback((msg: Outgoing) => {
    const ws = wsRef.current;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      queueRef.current.push(msg);
      return;
    }

    try {
      ws.send(JSON.stringify(msg));
    } catch (error) {}
  }, []);

  // keep sidebar "lastMessage" fresh and move thread to top
  const touchChat = useCallback(
    (
      roomKey: string,
      peer: { id: string; name?: string; avatar?: string | null },
      last?: { content: string; timestamp: string },
    ) => {
      setChatList((prev) => {
        const list = prev.slice();
        const idx = list.findIndex((c) => c.roomId === roomKey);
        if (idx === -1) {
          // create a new sidebar item (e.g., first DM before server knows)
          list.unshift({
            roomId: roomKey,
            peer: {
              id: peer.id,
              name: peer.name || `User ${peer.id}`,
              avatar: peer.avatar ?? null,
            },
            lastMessage: last,
            unread: 0,
          });
        } else {
          // update + move to top
          const updated: ChatListItem = {
            ...list[idx],
            peer: {
              id: peer.id || list[idx].peer.id,
              name: peer.name ?? list[idx].peer.name,
              avatar: peer.avatar ?? list[idx].peer.avatar,
            },
            lastMessage: last ?? list[idx].lastMessage,
          };
          list.splice(idx, 1);
          list.unshift(updated);
        }

        // keep a stable recency sort by lastMessage
        list.sort(
          (a, b) =>
            toUnix(b.lastMessage?.timestamp) - toUnix(a.lastMessage?.timestamp),
        );
        return list;
      });
    },
    [],
  );

  // API the UI will use
  const api = useMemo(
    () => ({
      sendToUser: (receiverId: string, text: string) => {
        // optimistic bubble in a temp "room" keyed by user_<id>
        const optimistic: Message = {
          id: "temp_" + Math.random().toString(36).slice(2),
          content: text,
          timestamp: new Date().toISOString(),
          isOwn: true,
          senderId: currentUserId || "me",
          senderName: "You",
          read: false,
        };
        const key = roomIdByUser[receiverId] ?? `user_${receiverId}`;

        setMessagesByRoom((prev) => {
          const arr = prev[key] ?? [];
          return { ...prev, [key]: [...arr, optimistic] };
        });

        // make sure the sidebar shows/updates this thread instantly
        touchChat(
          key,
          { id: receiverId },
          { content: text, timestamp: optimistic.timestamp },
        );

        // fire it
        send({ type: "message", receiverId, message: text });
      },

      sendToRoom: (roomId: string, text: string) => {
        const optimistic: Message = {
          id: "temp_" + Math.random().toString(36).slice(2),
          content: text,
          timestamp: new Date().toISOString(),
          isOwn: true,
          senderId: currentUserId || "me",
          senderName: "You",
          read: false,
        };

        setMessagesByRoom((prev) => {
          const arr = prev[roomId] ?? [];
          return { ...prev, [roomId]: [...arr, optimistic] };
        });

        // sidebar: bump thread + update last message
        touchChat(
          roomId,
          { id: "unknown" },
          { content: text, timestamp: optimistic.timestamp },
        );

        send({ type: "message", roomId, message: text });
      },

      loadHistory: (roomId: string, page = 1, limit = 50) =>
        send({ type: "chat_history", roomId, page, limit }),

      refreshChatList: () => send({ type: "chat_list" }),

      markRead: (messageIds: string[]) =>
        send({ type: "message_read", messageIds }),
    }),
    [send, currentUserId, roomIdByUser, touchChat],
  );

  // main connect/auth/handlers
  useEffect(() => {
    if (!token) {
      setError("No authentication token available");
      setConnected(false);
      setConnecting(false);
      return;
    }

    let mounted = true;
    let connectionTimeout: NodeJS.Timeout;

    const connect = () => {
      if (!mounted) return;
      setConnecting(true);
      setError(null);
      wsRef.current?.close();

      connectionTimeout = setTimeout(() => {
        if (mounted) {
          setError("Connection timeout - check your network or server");
          setConnecting(false);
        }
      }, 10000);

      // Test server connectivity first

      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          // Don't clear existing conversations on reconnect - only clear temp room mappings
          setRoomIdByUser({});

          // authenticate first (server should reply)

          ws.send(JSON.stringify({ type: "authenticate", token }));

          // flush queued sends
          const queued = queueRef.current.splice(0);

          queued.forEach((m) => {
            ws.send(JSON.stringify(m));
          });
        };

        ws.onmessage = (evt) => {
          if (!mounted) return;

          let data: Incoming;
          try {
            data = JSON.parse(evt.data);
          } catch (error) {
            return;
          }

          // auth OK (supports both {type:"authenticated"} and {type:"authentication",status:"success"})
          if (
            data.type === "authenticated" ||
            (data.type === "authentication" &&
              (data as any).status === "success")
          ) {
            clearTimeout(connectionTimeout);
            setConnected(true);
            setConnecting(false);
            setError(null);
            if ("userId" in data && data.userId) setCurrentUserId(data.userId!);
            ws.send(JSON.stringify({ type: "chat_list" }));
            return;
          }

          // sidebar list
          if (data.type === "chat_list") {
            const uid = (data as any).userId ?? currentUserId ?? "";
            const raw = (data as any).chatList ?? (data as any).items ?? [];

            const next: ChatListItem[] = raw.map((chat: any, index: number) => {
              const other =
                chat.ChatRoomParticipant?.find((p: any) => p.userId !== uid) ??
                chat.ChatRoomParticipant?.[0];
              const roomId = chat.id || chat.roomId;
              const peerId = chat.receiverId || other?.userId || "unknown";
              const peerName =
                chat.receiverName || other?.user?.fullName || "Unknown User";
              const peerAvatar =
                chat.receiverProfilePic || other?.user?.profilePic || null;

              const chatItem = {
                roomId,
                peer: { id: peerId, name: peerName, avatar: peerAvatar },
                lastMessage:
                  Array.isArray(chat.Chat) && chat.Chat.length
                    ? {
                        content: chat.Chat.at(-1).message,
                        timestamp: chat.Chat.at(-1).createdAt,
                      }
                    : undefined,
                unread: 0,
              };

              return chatItem;
            });

            // refresh user->room map (so first DMs can upgrade)
            setRoomIdByUser((prev) => {
              const copy = { ...prev };
              for (const c of next)
                if (c.peer.id && c.roomId) copy[c.peer.id] = c.roomId;
              return copy;
            });

            // Replace with server data completely to avoid mixing issues
            setChatList(() => {
              const sorted = next.slice();
              sorted.sort(
                (a, b) =>
                  toUnix(b.lastMessage?.timestamp) -
                  toUnix(a.lastMessage?.timestamp),
              );
              return sorted;
            });

            return;
          }

          // incoming/new message
          if (data.type === "message") {
            const roomId =
              ((data as any).roomId as string) ||
              ((data as any).chatRoomId as string) ||
              "";
            const senderId = (data as any).senderId ?? "unknown";
            const receiverId = (data as any).receiverId;
            const otherUserId =
              currentUserId && senderId === currentUserId
                ? receiverId
                : senderId;

            const msg: Message = {
              id:
                (data as any).id ||
                (data as any).messageId ||
                Math.random().toString(36).slice(2),
              content: (data as any).message ?? (data as any).content ?? "",
              timestamp:
                (data as any).createdAt ??
                (data as any).timestamp ??
                new Date().toISOString(),
              isOwn: Boolean(
                (data as any).isOwn ?? (senderId && senderId === currentUserId),
              ),
              senderId,
              senderName:
                (data as any).senderName ??
                (data as any).sender?.fullName ??
                "Unknown",
              read: Boolean((data as any).isRead),
            };

            // bind user -> room when we learn it
            if (otherUserId && roomId) {
              setRoomIdByUser((prev) =>
                prev[otherUserId] === roomId
                  ? prev
                  : { ...prev, [otherUserId]: roomId },
              );
            }

            setMessagesByRoom((prev) => {
              // if this was a first DM, we might already have a "user_<id>" bucket; merge it under the real room
              if (roomId && otherUserId) {
                const tempKey = `user_${otherUserId}`;
                const tempArr = prev[tempKey] ?? [];
                if (tempArr.length) {
                  const existing = prev[roomId] ?? [];
                  let merged = existing.slice();
                  // Only merge messages that belong to this specific conversation
                  for (const t of tempArr) {
                    if (
                      (t.senderId === currentUserId &&
                        receiverId === otherUserId) ||
                      (t.senderId === otherUserId && senderId === currentUserId)
                    ) {
                      merged = upsertMsg(merged, t);
                    }
                  }
                  merged = upsertMsg(merged, msg);

                  const { [tempKey]: _drop, ...rest } = prev;
                  return { ...rest, [roomId]: merged };
                }
              }

              const key =
                roomId || (otherUserId ? `user_${otherUserId}` : "unknown");
              const arr = prev[key] ?? [];
              return { ...prev, [key]: upsertMsg(arr, msg) };
            });

            // sidebar: make sure this room (or temp room) bubbles up with the new last message
            const sidebarKey =
              roomId || (otherUserId ? `user_${otherUserId}` : "unknown");
            touchChat(
              sidebarKey,
              { id: otherUserId || "unknown" },
              { content: msg.content, timestamp: msg.timestamp },
            );

            return;
          }

          // history page
          if (data.type === "chat_history") {
            const roomId =
              ((data as any).roomId as string) ||
              ((data as any).chatRoomId as string);
            if (!roomId) return;

            const raw =
              ((data as any).items as any[]) ??
              ((data as any).messages as any[]) ??
              ((data as any).history as any[]) ??
              ((data as any).chatHistory as any[]) ??
              [];

            const items: Message[] = raw.map((it: any) => ({
              id: it.id || it.messageId || Math.random().toString(36).slice(2),
              content: it.message ?? it.content ?? "",
              timestamp:
                it.createdAt ?? it.timestamp ?? new Date().toISOString(),
              isOwn: Boolean(
                it.isOwn ?? (it.senderId && it.senderId === currentUserId),
              ),
              senderId: it.senderId ?? "unknown",
              senderName: it.senderName ?? it.sender?.fullName ?? "Unknown",
              read: Boolean(it.isRead),
            }));

            setMessagesByRoom((prev) => {
              const cur = prev[roomId] ?? [];
              // Filter out messages that don't belong to this room/conversation
              const filteredItems = items.filter((item) => {
                // If we have a roomId, only include messages that are part of this specific room
                // This prevents mixing of messages from different conversations
                return true; // For now, trust the server to send correct room-specific messages
              });

              // we prepend older items; avoid dupes
              let merged = cur.slice();
              for (const item of filteredItems)
                merged = upsertMsg(merged, item);
              // Sort messages by timestamp to ensure proper ordering
              merged.sort(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime(),
              );
              return { ...prev, [roomId]: merged };
            });
            setHasMoreByRoom((p) => ({
              ...p,
              [roomId]: Boolean((data as any).hasMore),
            }));
            setPageByRoom((p) => ({ ...p, [roomId]: (data as any).page ?? 1 }));
            return;
          }

          // message status (delivered, read, etc.)
          if (data.type === "message_status") {
            const messageId = (data as any).messageId;
            const status = (data as any).status;
            const roomId = (data as any).roomId;

            // Update message status in the appropriate room
            if (messageId && roomId) {
              setMessagesByRoom((prev) => {
                const updated = { ...prev };
                // Check all rooms for this message ID
                Object.keys(updated).forEach((key) => {
                  const messages = updated[key];
                  const msgIndex = messages.findIndex(
                    (m) => m.id === messageId,
                  );
                  if (msgIndex !== -1) {
                    updated[key] = messages.map((msg, idx) =>
                      idx === msgIndex
                        ? {
                            ...msg,
                            read: status === "read",
                            delivered: status === "delivered",
                          }
                        : msg,
                    );
                  }
                });
                return updated;
              });
            }
            return;
          }

          // errors
          if (data.type === "error") {
            setError(`${(data as any).code}: ${(data as any).message}`);
            setConnecting(false);
            return;
          }
        };

        ws.onclose = (ev) => {
          if (!mounted) return;

          // Provide user-friendly error messages based on close codes
          let errorMessage = "";
          switch (ev.code) {
            case 1000:
              errorMessage = "Connection closed normally";
              break;
            case 1001:
              errorMessage = "Connection closed - going away";
              break;
            case 1002:
              errorMessage = "Connection closed due to protocol error";
              break;
            case 1003:
              errorMessage = "Connection closed - unsupported data type";
              break;
            case 1006:
              errorMessage = "Connection lost unexpectedly (network issue)";
              break;
            case 1011:
              errorMessage = "Server encountered an error";
              break;
            case 1012:
              errorMessage = "Server restarting";
              break;
            default:
              errorMessage = `Connection closed (Code: ${ev.code})${
                ev.reason ? ` - ${ev.reason}` : ""
              }`;
          }

          if (ev.code !== 1000) {
            setError(errorMessage);
          }

          clearTimeout(connectionTimeout);
          setConnected(false);
          setConnecting(false);

          if (ev.code !== 1000 && !reconnectTimer.current) {
            reconnectTimer.current = setTimeout(() => {
              reconnectTimer.current = null;
              connect();
            }, 1200);
          }
        };

        ws.onerror = (error) => {
          setError("");
          //   setError("WebSocket connection error");
          setConnecting(false);
        };
      } catch (error) {
        setError(
          `Failed to establish connection: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
        setConnecting(false);
      }
    };

    connect();
    return () => {
      mounted = false;
      wsRef.current?.close();
      wsRef.current = null;
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
      }
      // Clear queued messages to prevent memory leaks
      queueRef.current = [];
      // Only clear temp mappings on unmount, not all conversations
      setRoomIdByUser({});
    };
  }, [url, token, currentUserId, touchChat, clearChatState]);

  return {
    // connection
    connected,
    connecting,
    error,

    // data
    chatList,
    messagesByRoom,
    hasMoreByRoom,
    pageByRoom,
    roomIdByUser,

    // actions
    ...api,
  };
}
