// src/app/api/createIssue/route.js

import { NextResponse } from 'next/server';
import axiosInstance from '../../../utils/axiosInstance';

// ฟังก์ชัน POST สำหรับสร้าง Issue
export async function POST(request) {
    const { PROJECT_KEY } = process.env;
    const body = await request.json();

    try {
        // อ่าน body ที่ส่งมาจากฝั่ง Client
        console.log(body);


        // เรียก Jira API เพื่อสร้าง Issue
        const response = await axiosInstance.post('issue',
            {
                "fields": {
                    "project": {
                        "key": PROJECT_KEY
                    },
                    "summary": body.title,
                    "description": {
                        "type": "doc",
                        "version": 1,
                        "content": [
                            {
                                "type": "paragraph",
                                "content": [
                                    {
                                        "text": body.description,
                                        "type": "text"
                                    }
                                ]
                            }
                        ]
                    },
                    "issuetype": {
                        "name": body.issueType.charAt(0).toUpperCase() + body.issueType.slice(1)
                    },
                    "customfield_10037": "suk25444@gmail.com",
                    "priority": {
                        "name": "Lowest" // กำหนด Priority เช่น Medium, High, Low
                    }
                }
            }

        );

        // ส่งคำตอบกลับ
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error('Error creating issue:', error.response ? error.response.data : error.message);
        return NextResponse.json(
            {
                message: error.response ? error.response.data.message : error.message || 'Internal Server Error'
            },
            { status: error.response ? error.response.status : 500 }
        );
    }
}
