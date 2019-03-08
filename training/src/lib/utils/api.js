import axios from 'axios';

export async function CallApi(url, method, data) {
  try {
    const res = await axios({
      url,
      method,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
