import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import {normalizePost} from "../common/helpers";
import {NUMBER_OF_POSTS_PER_PAGE} from "../common/constants";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        post: [],
        search: '',
        postsIdByUserId: [],
        currentPageNumber: 1,
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
            return filtered;
        },

        getPosts(state, getters) {
            const filteredPosts = getters.getFilteredPosts;

            const START_INDEX = state.currentPageNumber * NUMBER_OF_POSTS_PER_PAGE - NUMBER_OF_POSTS_PER_PAGE;
            const END_INDEX = state.currentPageNumber * NUMBER_OF_POSTS_PER_PAGE;

            return filteredPosts.slice(START_INDEX, END_INDEX);
        },

        getPageNumbers(state, getters) {
            const filteredPosts = getters.getFilteredPosts;
            const LAST_PAGE_NUMBER = Math.ceil(filteredPosts.length / NUMBER_OF_POSTS_PER_PAGE);
            return Array.from({length: LAST_PAGE_NUMBER}, (item, key) => ++key)
        },

        getPost(state) {
            return state.post;
        },

        getUserIds(state, getters) {
            return [...new Set(getters.getFilteredPosts.map(POST => POST.userId))];
        },
    },

    mutations: {
        SET_POSTS(state, payload) {
            state.posts = [...payload];
        },

        SET_POST(state, payload) {
            state.post = {...payload};

            const POSTS = [...state.posts];
            const INDEX = POSTS.findIndex(POST => POST.id === payload.id);

            if (INDEX !== -1) {
                POSTS.splice(INDEX, 1, payload);
                state.posts = [...POSTS];
            }
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

        EDIT_POST(state, payload) {
            const POSTS = [...state.posts];
            const INDEX = POSTS.findIndex(POST => POST.id === payload.id);

            if (INDEX !== -1) {
                POSTS.splice(INDEX, 1, payload);
                state.posts = [...POSTS];
            }
        },

        CLEAR_POSTS_ID_BY_USER_ID(state) {
            state.postsIdByUserId = [];
        },

        SET_FILTERS(state, payload) {
            state.search = payload;
        },

        CHANGE_CURRENT_PAGE_NUMBER(state, payload) {
            state.currentPageNumber = payload;
        },

        SET_DEFAULT_CURRENT_PAGE_NUMBER(state) {
            state.currentPageNumber = 1;
        }
    },

    actions: {
        async GET_POSTS({commit}) {
            const RESPONSE = await axios.get('http://jsonplaceholder.typicode.com/posts')
            const DATA = RESPONSE.data.map(POST => normalizePost(POST))
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
            const ADAPTED_DATA = normalizePost(DATA);

            commit('SET_POST', ADAPTED_DATA);
        },

        async DELETE_POST_BY_ID({commit}, postId) {
            axios.delete(`http://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(() => commit('DELETE_POST_BY_ID', postId))
                .catch(() => console.log(`error delete`))
        },

        async EDIT_POST({commit}, newData) {
            const RESPONSE = await axios.patch(`http://jsonplaceholder.typicode.com/posts/${newData.id}`, {
                title: newData.title,
                body: newData.description,
            });

            const DATA = RESPONSE.data;
            const ADAPTED_DATA = normalizePost(DATA);

            commit('EDIT_POST', ADAPTED_DATA);
            commit('SET_POST', ADAPTED_DATA);
        },

        SET_FILTERS({commit}, filterSearch) {
            commit('SET_FILTERS', filterSearch)
        },

        CLEAR_POSTS_ID_BY_USER_ID({commit}) {
            commit('CLEAR_POSTS_ID_BY_USER_ID')
        },

        CHANGE_CURRENT_PAGE_NUMBER({commit}, page) {
            commit('CHANGE_CURRENT_PAGE_NUMBER', page);
        },

        SET_DEFAULT_CURRENT_PAGE_NUMBER({commit}) {
            commit('SET_DEFAULT_CURRENT_PAGE_NUMBER');
        },
    }
});

