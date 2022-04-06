import axios from 'axios';
import {BASE_URL} from '../variables.js';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
    },
};

// get query param of calculator id
const params = new URLSearchParams(document.location.search.substring(1));
const calculatorId = params.get("id");

function fetchAllCourses(data) {
    return axios.get(`${BASE_URL}/api/GetCourseData${calculatorId ? `?calc_id=${calculatorId}` : ""}`, data, axiosConfig);  // if no calculator id present, send "" and the backend defaults to "1"
}

// expected data: { "selections": [ 1234567, 0101010, 5564732, 1238921 ] }
function submitSelection(data) {
    const selection = {...data, calc_id: calculatorId || ""}; // if no calculator id present, send "" and the backend defaults to "1"
    return axios.post(`${BASE_URL}/api/SubmitCourseSelections/`, selection, axiosConfig);
}

function searchForCourse(data) { 
    return axios.get(`${BASE_URL}/api/Search?q=${data.searchTerm}`, data, axiosConfig); 
}

// function fetchCourse(data) {
//     return axios.get(`${BASE_URL}/api/GetCourseDetails?courseid=${data.courseId}?calc_id=${calculatorId}/`, data, axiosConfig);
// }

export {
    fetchAllCourses,
    submitSelection,
    searchForCourse,
};