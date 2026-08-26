import { chatApi } from '../api/chat/chatApi';
import type { AppDispatch } from '../store';
import type { Chat } from '@/types/chat';

export const appendChatMessageToCache = (
    dispatch: AppDispatch,
    chatRoomId: string,
    message: Chat
) => {
    dispatch(
        chatApi.util.updateQueryData('getRoomMessages', { chatRoomId }, (draft) => {
            if (draft && Array.isArray(draft.data)) {
                const exists = draft.data.some(
                    (m) => m._id === message._id || (message.tempId && m.tempId === message.tempId)
                );
                if (!exists) {
                    draft.data.push(message);
                }
            }
        })
    );
};