import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        filters: {
            search: '',
            userId: null,
        },
    },
    getters: {
        getFilteredPosts(state) {

            let filters = state.filters;
            let filtered = state.posts
                .filter(post => {
                    return filters.search === '' || post.title.indexOf(filters.search) !== -1 || post.description.indexOf(filters.search) !== -1;
                });
            console.log(filtered);
            return filtered
        },
        getUserIds(state) {
            return [...new Set(state.posts.map(post => post.userId))];
        },
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        },
        setFilters(state, payload) {
            console.log('setFilters')
            state.filters = payload;
        },
    },
    actions: {
        async getPosts(context) {
            const response = await axios.get('http://jsonplaceholder.typicode.com/posts')
            const data = response.data.map(item => {
                return {
                    userId: item.userId,
                    id: item.id,
                    title: item.title,
                    description: item.body,
                }
            })
            context.commit('setPosts', data)
            console.log(data)
        },
        async getPostsByUserId(context, userId) {
            const response = await axios.get('http://jsonplaceholder.typicode.com/posts?userId=', userId)
            const data = response.data;
            context.commit('setPosts', data)
        },
        async getPostById(context, postId) {
            return await axios.get('http://jsonplaceholder.typicode.com/posts', postId)
        }
    }
});

