import ApiService from '../services/api.service';

const initialState = null;
export const account = {
  namespaced: true,
  state: initialState,
  actions: {
    getAccountInfo( {}, payload ){
      return new Promise ( async function (resolve, reject) {
        return await ApiService.getAccountInfo(payload.id)
          .then(function (response) {
            if(response.status){
              const data = response; 
              resolve(data);
            } else {
              const error = response.error || "NetworkError";
              reject(error);
            }
          });
      });
    }
  },
};