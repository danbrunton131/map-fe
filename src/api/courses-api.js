import axios from 'axios';
import {BASE_URL} from '../variables';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
    },
};
  

function fetchAllCourses(data) {
    return axios.get(`${BASE_URL}/api/GetCourseData/`, data, axiosConfig);
}

function fetchCourse(data) {
    return axios.get(`${BASE_URL}/api/GetCourseDetails?courseid=${data.courseId}/`, data, axiosConfig);
}


// expected data: { "selections": [ 1234567, 0101010, 5564732, 1238921 ] }
function createReview(data) {
    return axios.post(`${BASE_URL}/api/SubmitCourseSelections/`, data, axiosConfig);
}

export {
    fetchAllCourses,
    fetchCourse,
    createReview,
};