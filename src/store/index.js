import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: []
    },
    getters: {
        filteredPosts(state) {
            return state.posts;
        },
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        }
    },
    actions: {
        async getPosts(context) {
            const response = await axios.get('http://jsonplaceholder.typicode.com/posts')
            context.commit('setPosts', response.data)
            console.log(response.data)
        },
        async getPostById(context, postId) {
            return await axios.get('http://jsonplaceholder.typicode.com/posts', postId)
        }
    }
});

