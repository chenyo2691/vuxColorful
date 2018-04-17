const vux = {
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading;
        }
    },
    actions: {
        // LOAD_PANORAMA({commit, dispatch, state}, {trackInfo}) {
        //     commit('LOAD_PANORAMA', trackInfo);
        // }
    }
};

export default vux;
