import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true
});


export const genrateInterviewReport = async (jobDescription, resumeFile, selfDescription) => {
  const formData = new FormData();
  formData.append('jobDescription', jobDescription);
  formData.append('resumeFile', resumeFile);
  formData.append('selfDescription', selfDescription);

  try {
    const response = await api.post('/api/interview/', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;

  } catch (error) {
    console.error('Error generating interview report:', error);
    return error.response.data;
  }
}

export const getInterviewReportById = async (id) => {
  try {
    const response = await api.get(`/api/interview/report/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching interview report:', error);
    throw error;
  }
}

export const getAllInterviewReport = async () => {
  try {
    const response = await api.get(`/api/interview/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all interview report:', error);
    throw error;
  } s
}