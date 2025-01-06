import { NextResponse } from 'next/server';
import axiosInstance from '../../../utils/axiosInstance';

export async function GET( ) {
  try {
    const response = await axiosInstance.get('priorityscheme/priorities/available');
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching priorities:', error.response ? error.response.data : error.message);
    return NextResponse.json(
      { message: error.response ? error.response.data.message : 'Internal Server Error' },
      { status: error.response ? error.response.status : 500 }
    );
  }
}

