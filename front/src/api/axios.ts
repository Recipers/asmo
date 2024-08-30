import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://192.168.0.6:48888'
      : 'http://localhost:48888',
  withCredentials: true,
});

export default axiosInstance;
