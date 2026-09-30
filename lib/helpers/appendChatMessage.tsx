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
                const existingIndex = draft.data.findIndex(
                    (m) => (message._id && m._id === message._id) || (message.tempId && m.tempId === message.tempId)
                );
                if (existingIndex !== -1) {
                    draft.data[existingIndex] = { ...draft.data[existingIndex], ...message };
                } else {
                    draft.data.push(message);
                }
            }
        })
    );
};