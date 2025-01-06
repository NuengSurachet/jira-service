import axios from 'axios';

const { JIRA_URL, JIRA_USER, JIRA_API_TOKEN } = process.env;

// เข้ารหัสข้อมูลการยืนยันตัวตนเป็น Base64
const auth = Buffer.from(`${JIRA_USER}:${JIRA_API_TOKEN}`).toString('base64');

// ลบการ log นี้หลังจากตรวจสอบเสร็จแล้ว
console.log('Authorization Header:', `Basic ${auth}`);

const axiosInstance = axios.create({
  baseURL: `${JIRA_URL}/rest/api/3/`,
  headers: {
    'Authorization': `Basic ${auth}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
