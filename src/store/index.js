import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        post: [],
        search: '',
        postsIdByUserId: [],
    },

    getters: {
        getFilteredPosts(state) {
            const POSTS = state.posts;
            let filtered = [];
            for (const POST of POSTS) {
                if (state.search !== '' && POST.title.indexOf(state.search) === -1 && POST.description.indexOf(state.search) === -1) {
                    continue;
                }
                if (state.postsIdByUserId.length && !state.postsIdByUserId.includes(POST.id)) {
                    continue;
                }
                filtered.push(POST);
            }
            return filtered
        },

        getUserIds(state) {
            return [...new Set(state.posts.map(POST => POST.userId))];
        },

        getPost(state) {
            return state.post;
        }
    },

    mutations: {
        SET_POSTS(state, payload) {
            state.posts = [...payload];
        },

        SET_POST(state, payload) {
            state.post = {...payload};
        },

        SET_POSTS_ID_BY_USER_ID(state, payload) {
            state.postsIdByUserId = [...payload];
        },

        DELETE_POST_BY_ID(state, payload) {
            const POSTS = [...state.posts];
            const INDEX = POSTS.findIndex(POST => POST.id === payload);
            if (INDEX !== -1) {
                POSTS.splice(INDEX, 1);
                state.posts = [...POSTS];
            }
        },

        CLEAR_POSTS_ID_BY_USER_ID(state) {
            state.postsIdByUserId = [];
        },

        SET_FILTERS(state, payload) {
            state.search = payload;
        },
    },

    actions: {
        async GET_POSTS({commit}) {
            const RESPONSE = await axios.get('http://jsonplaceholder.typicode.com/posts')
            const DATA = RESPONSE.data.map(ITEM => {
                return {
                    userId: ITEM.userId,
                    id: ITEM.id,
                    title: ITEM.title,
                    description: ITEM.body,
                }
            })
            commit('SET_POSTS', DATA);
        },

        async GET_POST_IDS_BY_USER_ID({commit}, userId) {
            const RESPONSE = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            const DATA = RESPONSE.data.map(POST => {
                return POST.id;
            });
            commit('SET_POSTS_ID_BY_USER_ID', DATA);
        },

        async GET_POST_BY_ID({commit}, postId) {
            const RESPONSE = await axios.get(`http://jsonplaceholder.typicode.com/posts/${postId}`);
            const DATA = RESPONSE.data;
            const ADAPTED_DATA = {
                userId: DATA.userId,
                id: DATA.id,
                title: DATA.title,
                description: DATA.body,
            };

            commit('SET_POST', ADAPTED_DATA);
        },

        async DELETE_POST_BY_ID({commit}, postId) {
            axios.delete(`http://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(() => commit('DELETE_POST_BY_ID', postId))
                .catch(() => console.log(`error`))
        },

        SET_FILTERS({commit}, filterSearch) {
            commit('SET_FILTERS', filterSearch)
        },

        CLEAR_POSTS_ID_BY_USER_ID({commit}) {
            commit('CLEAR_POSTS_ID_BY_USER_ID')
        },
    }
});

