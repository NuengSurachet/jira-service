// src/utils/apiClient.js

import axios from "axios";

const fetchPriorities = async () => {
  try {
    const res = await axios.get('/api/fetchPriorities');
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching priorities:', err.response ? err.response.data : err.message);
    throw err;
  }
};



const fetchAllProjects = async () => {
  try {
    const res = await axios.get('/api/getAllProjects');
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching projects:', err.response ? err.response.data : err.message);
    throw err;
  }
};


const createIssue = async (issueData) => {
  console.log('Creating issue:', issueData);

  try {
    // เรียก POST ไปยัง /api/createIssue
    const res = await axios.post('/api/createIssue', issueData);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Error creating issue:', err.response ? err.response.data : err.message);
    throw err;
  }
};
const getScenes = async () => {
  try {
    const res = await axios.get('/api/getscene');
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching projects:', err.response ? err.response.data : err.message);
    throw err;
  }
};

export { fetchAllProjects, fetchPriorities, createIssue, getScenes };