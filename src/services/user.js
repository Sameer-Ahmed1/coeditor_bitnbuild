import axios from "axios";
import config from "../config";
const baseUrl = `${config.base_url}/api/users`;
const createUser = async (newObj) => {
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};
export default { createUser };
