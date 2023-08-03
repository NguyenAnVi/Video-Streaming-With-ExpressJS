import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class ApiService {
  async getVideoProperties(videoId) {
    return await axios
      .get(API_URL + 'getvideoproperties/'+videoId)
      .then(response => {
        if (response.data) {
          // console.log(response.data)
        }
        return response.data;
      });
  }

}

export default new ApiService();