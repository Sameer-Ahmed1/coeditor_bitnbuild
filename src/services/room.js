import axios from "axios";
import config from "../config";
const baseUrl = `${config.base_url}/api/room`;
export const getRooms = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default { getRooms };
