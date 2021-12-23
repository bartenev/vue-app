import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        search: '',
        postsIdByUserId: [],
    },
    getters: {
        getFilteredPosts(state) {
            let posts = state.posts;
            let filtered = [];
            for (let post of posts) {
                if (state.search !== '' && post.title.indexOf(state.search) === -1 && post.description.indexOf(state.search) === -1) {
                    continue;
                }
                if (state.postsIdByUserId.length && !state.postsIdByUserId.includes(post.id)) {
                    continue;
                }
                filtered.push(post);
            }
            return filtered
        },
        getUserIds(state) {
            return [...new Set(state.posts.map(post => post.userId))];
        },
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = [...payload];
        },
        setPostsIdByUserId(state, payload) {
            state.postsIdByUserId = [...payload];
        },
        deletePostById(state, payload) {
            state.posts = [...state.posts.filter(post => post.id !== payload)];
        },
        clearPostsIdByUserId(state) {
            state.postsIdByUserId = [];
        },
        setFilters(state, payload) {
            state.search = payload;
        },
    },
    actions: {
        async getPosts({commit}) {
            const RESPONSE = await axios.get('http://jsonplaceholder.typicode.com/posts')
            const DATA = RESPONSE.data.map(ITEM => {
                return {
                    userId: ITEM.userId,
                    id: ITEM.id,
                    title: ITEM.title,
                    description: ITEM.body,
                }
            })
            commit('setPosts', DATA)
        },
        async getPostsByUserId({commit}, userId) {
            const RESPONSE = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            const DATA = RESPONSE.data.map(POST => {
                return POST.id;
            });
            commit('setPostsIdByUserId', DATA)
        },
        async getPostById(context, postId) {
            return await axios.get('http://jsonplaceholder.typicode.com/posts', postId)
        },
        async deletePostById({commit}, postId) {
            axios.delete(`http://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(() => commit('deletePostById', postId))
                .catch(() => console.log(`error`))
        },
    }
});

