import axios from 'axios';

export async function callApi(url, method, data, headers, params) {
  try {
    const res = await axios({
      url,
      baseURL: 'https://express-training.herokuapp.com/',
      method,
      data: data || {},
      headers,
      params,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
