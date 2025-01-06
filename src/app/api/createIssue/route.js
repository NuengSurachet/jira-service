// src/app/api/createIssue/route.js

import { NextResponse } from 'next/server';
import axiosInstance from '../../../utils/axiosInstance';

// ฟังก์ชัน POST สำหรับสร้าง Issue
export async function POST() {
    const { PROJECT_KEY } = process.env;

    try {
        // อ่าน body ที่ส่งมาจากฝั่ง Client


        // เรียก Jira API เพื่อสร้าง Issue
        const response = await axiosInstance.post('issue',
            {
                "fields": {
                    "project": {
                        "key": PROJECT_KEY
                    },
                    "summary": ,
                    "description": {
                        "type": "doc",
                        "version": 1,
                        "content": [
                            {
                                "type": "paragraph",
                                "content": [
                                    {
                                        "text": "รายละเอียดปัญหา...",
                                        "type": "text"
                                    }
                                ]
                            }
                        ]
                    },
                    "issuetype": {
                        "name": "Bug"
                    },
                    "customfield_10037": "suk25444@gmail.com",
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
