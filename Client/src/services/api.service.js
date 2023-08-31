import axios from 'axios';
import config from '../config/index.config';

const API_URL = config.API_URL;

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

  async getRecomendedVideos (currentVideo) {
    return await axios
    .post(
      API_URL + 'getrecommendedvideos', // http://localhost:3000/getRecommendedVideos type POST
      currentVideo ,                   // req.body
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
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

  async uploadVideo (payload) {
    return await axios
    .post(API_URL + 'uploadvideo',{data: payload})
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
}

export default new ApiService();