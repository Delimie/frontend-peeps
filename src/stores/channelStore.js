import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    createChannelApi,
    deleteChannelApi,
    getChannelByGroupIdApi,
    updateChannelApi
} from "../api/channelApi";
import { socket } from "../socket/socket";
import { CHANNEL_ACTION } from "../shared/constants/socket.constant";


const useChannelStore = create(
    persist(
        (set, get) => ({
            channels: [
                // Channels data format
                // { groupId: 1, channelList: [{ channelId: 1, name: 'Welcome#1', type: 'TEXT', unreadNoti: 0 }, { channelId: 2, name: 'Welcome#2', type: 'TEXT', unreadNoti: 2 }] },
                // { groupId: 2, channelList: [{ channelId: 3, name: 'This is just for chat', type: 'TEXT', unreadNoti: 5 }, { channelId: 4, name: 'Welcome#4', type: 'TEXT', unreadNoti: 0 }] },
                // { groupId: 3, channelList: [{ channelId: 5, name: 'Welcome#5', type: 'TEXT', unreadNoti: 0 }, { channelId: 6, name: 'Welcome#6', type: 'TEXT', unreadNoti: 120 }] },
            ],
            currentChannel: null,
            channelUsers: [],
            loading: false,
            createChannel: async (body) => {
                try {
                    // const {name , type, groupId} = body;
                    set({ loading: true });
                    const resp = await createChannelApi(body);
                    console.log(resp.data.message);
                    const newChannel = resp.data.result;

                    set((state) => {

                        // Map out new value 
                        const updateChannels = state.channels.map((group) => {
                            if (group.groupId === newChannel.groupId) {
                                return { ...group, channelList: [...group.channelList, { channelId: newChannel.id, name: newChannel.name, type: newChannel.type, unreadNoti: 0 }] }
                            }
                            return group
                        });

                        return { channels: updateChannels, loading: false }
                    });
                    return newChannel;
                } catch (error) {
                    console.error(error.message);
                    return;
                }
            },
            getChannelByGroupId: async (groupId) => {
                try {
                    const newChannels = get().channels.map((el) => el);
                    set({ loading: true });
                    const resp = await getChannelByGroupIdApi(Number(groupId));
                    // console.log(resp.data.message);

                    const newChannelList = {
                        groupId: parseInt(groupId),
                        channelList: resp.data.result.map((el) => ({ channelId: el.id, name: el.name, type: el.type, unreadNoti: 0 }))
                    };

                    const existingIndex = newChannels.findIndex(el => el.groupId === newChannelList.groupId);

                    // If find existing groupId to modify
                    if (existingIndex !== -1) {
                        // console.log(`This groupId ${groupId} has already exited`);
                        newChannels.splice(existingIndex, 1, newChannelList);
                        set({ channels: [...newChannels], loading: false })
                        return resp;
                    }
                    // If find existing groupId to modify

                    // If groupId is new 
                    set({ channels: [...newChannels, { ...newChannelList }], loading: false })
                    return resp;

                } catch (error) {
                    console.log(error.message)
                    return;
                }
            },
            updateChannel: async (channelId, body) => {
                try {
                    // const {name} = body;
                    const resp = await updateChannelApi(channelId, body);
                    const updatedChannel = resp.data.result;

                    const newChannels = get().updateChannelsName(updatedChannel);

                    // console.log('newChannels ',newChannels);

                    //Socket Emit to annouced updated channel name
                    socket.emit(CHANNEL_ACTION.CHANNEL_UPDATE, { message: 'Emit to update channel Name', data : updatedChannel });

                    return newChannels;
                } catch (error) {
                    console.log(error.message)
                    return;
                }
            },
            updateChannelsName: (channelData) => {
                const channelListByGroupId = get().channels.find(el => el.groupId === channelData.groupId);
                if(!channelListByGroupId) console.warn('No ChannelList in group id', channelData.groupId);
                const createNewUpdatedChannelList = channelListByGroupId.channelList.map(channel => channel.channelId === channelData.id ? { ...channel, name: channelData.name } : channel);
                const newChannels = get().channels.map(el => el.groupId === channelListByGroupId.groupId ? { ...el, channelList: createNewUpdatedChannelList } : el);

                set({ channels: newChannels });
                return newChannels
            },
            deleteChannel: async (channelId) => {
                const resp = await deleteChannelApi(channelId);
                set((state) => ({
                    channels: state.channels.filter((g) => g.id !== channelId),
                }));
                return resp;
            },
            setCurrentChannelById: (groupId, channelId) => {
                const currentChannelList = get().channels.find(ch => ch.groupId === Number(groupId)).channelList;
                const currentChannel = currentChannelList.find(ch => ch.channelId === Number(channelId));
                set({ currentChannel: currentChannel });
            },
            unreadNotiIncrease: (channelId) => {
                const listOutChannel = get().channels.find(el => el.groupId === Number(groupId));
            },
        }),
        {
            name: "channel-storage"
        }
    )
);

export default useChannelStore;