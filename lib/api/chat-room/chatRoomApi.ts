import { CreateChatRoomResponse, CreateChatRoomRequest, GetChatRoomResponse, UpdateChatRoomRequest } from "@/types/chatroom";
import { baseApi } from "../baseApi";

export const chatRoomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createChatRoom: builder.mutation<CreateChatRoomResponse, CreateChatRoomRequest>({
            query: (data) => ({
                url: '/chat-room',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["ChatRoom"]
        }),
        getChatrooms: builder.query<GetChatRoomResponse, void>({
            query: () => ({
                url: '/chat-room',
                method: 'GET',
            }),
            providesTags: ["ChatRoom"]
        }),
        getChatRoomById: builder.query<GetChatRoomResponse, string>({
            query: (id) => ({
                url: `/chat-room/${id}`,
                method: 'GET',
            }),
            providesTags: ["ChatRoom"]
        }),
        updateChatRoomById: builder.mutation<GetChatRoomResponse, { id: string, data: UpdateChatRoomRequest }>({
            query: ({ id, data }) => ({
                url: `/chat-room/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ["ChatRoom"]
        }),
        deleteChatRoomById: builder.mutation<GetChatRoomResponse, string>({
            query: (id) => ({
                url: `/chat-room/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["ChatRoom"]
        })
    })
})

export const { useCreateChatRoomMutation, useGetChatroomsQuery, useGetChatRoomByIdQuery, useUpdateChatRoomByIdMutation, useDeleteChatRoomByIdMutation } = chatRoomApi;