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

API.getPhotos = async (topicSlug = null, page = 1) => {
    if (!topicSlug) return [];
    const response = await axios.get(`${BASE_URL}/topics/${topicSlug}/photos/?client_id=${ACCESS_KEY}&page=${page}`);
    return {
        photos: response.data,
        page: page,
    };
};

API.getRandomPhoto = async (query = "background", count = 1) => {
    const response = await axios.get(`${BASE_URL}/photos/random/?client_id=${ACCESS_KEY}&count=${count}`);
    return response.data;
};

export default API;
