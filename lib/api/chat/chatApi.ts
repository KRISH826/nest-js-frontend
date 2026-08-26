// src/lib/api/chat/chatApi.ts
import { baseApi } from '../baseApi';
import {
    ChatResponse,
    GetRoomMessagesResponse,
    SendMessageRequest,
    EditMessageRequest,
} from '@/types/chat';

export { appendChatMessageToCache } from '../../helpers/appendChatMessage';

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Matches: @Get('room/:chatRoomId')
        getRoomMessages: builder.query<
            GetRoomMessagesResponse,
            { chatRoomId: string; limit?: number; before?: string }
        >({
            query: ({ chatRoomId, limit = 30, before }) => ({
                url: `/chat/room/${chatRoomId}`,
                method: 'GET',
                params: {
                    ...(limit ? { limit } : {}),
                    ...(before ? { before } : {}),
                },
            }),
            providesTags: (result, error, { chatRoomId }) => [
                { type: 'Chat', id: chatRoomId },
            ],
        }),

        // Matches: @Post()
        sendMessage: builder.mutation<ChatResponse, SendMessageRequest>({
            query: (body) => ({
                url: '/chat',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { chatRoom }) => [
                { type: 'Chat', id: chatRoom },
            ],
        }),

        // Matches: @Get(':id')
        getChatById: builder.query<ChatResponse, string>({
            query: (id) => ({
                url: `/chat/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Chat', id }],
        }),

        // Matches: @Patch(':id')
        updateMessage: builder.mutation<
            ChatResponse,
            { id: string; chatRoomId: string; data: EditMessageRequest }
        >({
            query: ({ id, data }) => ({
                url: `/chat/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { chatRoomId, id }) => [
                { type: 'Chat', id },
                { type: 'Chat', id: chatRoomId },
            ],
        }),

        // Matches: @Delete(':id')
        deleteMessage: builder.mutation<
            ChatResponse,
            { id: string; chatRoomId: string }
        >({
            query: ({ id }) => ({
                url: `/chat/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { chatRoomId, id }) => [
                { type: 'Chat', id },
                { type: 'Chat', id: chatRoomId },
            ],
        }),
    }),
});

export const {
    useGetRoomMessagesQuery,
    useLazyGetRoomMessagesQuery,
    useSendMessageMutation,
    useGetChatByIdQuery,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} = chatApi;