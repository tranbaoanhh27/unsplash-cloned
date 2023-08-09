import axios from "axios";

const ACCESS_KEY = "wc1Xg-SiEPLbjNAGrRXfBvvoXtnLFKNvnH6BgkHr3Pg";
const BASE_URL = "https://api.unsplash.com";

const API = {};

API.getTopics = async (page = 1) => {
    let response = await axios.get(`${BASE_URL}/topics/?client_id=${ACCESS_KEY}&page=${page}`);
    return {
        topics: response.data,
        page: page,
    };
};

export default API;
