import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class ApiService {
  async getVideoProperties (id) {
    return await axios
    .get(API_URL + 'getvideoproperties/'+id)
    .then(response => {
      const data = response.data;
      return {
        status:true,
        data
      };
    })
    .catch(error=>{
      return {
        status:false,
        error
      }
    });
      
  }
    

  async getVideos() {
    return await axios
      .get(API_URL + "getvideos")
      .then(response => {
        const data = response.data;
        return {
          status:true,
          data
        }
      })
      .catch(err=>{
        return {
          status:false,
          error:err
        }
      });
  }
}

export default new ApiService();