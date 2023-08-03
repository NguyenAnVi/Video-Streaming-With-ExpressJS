import ApiService from '../services/api.service';

const initialState = null;
export const video = {
  namespaced: true,
  state: initialState,
  actions: {
    getVideoProperties({ commit }, videoId) {
      return ApiService.getVideoProperties(videoId).then(
        successResponse => {
          commit('getSuccess', successResponse);
          return Promise.resolve(successResponse);
        },
        failureResponse => {
          commit('getFailure');
          return Promise.reject(failureResponse);
        }
      );
    }
  },
  mutations: {
    getSuccess(state, response) {
      state.currentvideo = response.video;
    },
    getFailure(state) {
      state.currentvideo = null;
    },
  }
};