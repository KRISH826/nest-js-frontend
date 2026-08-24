import { CreateChatRoomResponse, CreateChatRoomRequest, GetChatRoomResponse, GetChatRoomsResponse, UpdateChatRoomRequest } from "@/types/chatroom";
import { baseApi } from "../baseApi";

export const chatRoomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createChatRoom: builder.mutation<CreateChatRoomResponse, FormData | CreateChatRoomRequest>({
            query: (data) => ({
                url: '/chat-room',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["ChatRoom"]
        }),
        getChatrooms: builder.query<GetChatRoomsResponse, void>({
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
        updateChatRoomById: builder.mutation<GetChatRoomResponse, { id: string, data: FormData | UpdateChatRoomRequest }>({
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
        }),
        joinChatRoom: builder.mutation<GetChatRoomResponse, string>({
            query: (id) => ({
                url: `/chat-room/${id}/join`,
                method: 'POST',
            }),
            invalidatesTags: ["ChatRoom"]
        })
    })
})

export const {
    useCreateChatRoomMutation,
    useGetChatroomsQuery,
    useGetChatRoomByIdQuery,
    useUpdateChatRoomByIdMutation,
    useDeleteChatRoomByIdMutation,
    useJoinChatRoomMutation
} = chatRoomApi;