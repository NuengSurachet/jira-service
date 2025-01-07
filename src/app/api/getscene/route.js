import { NextResponse } from 'next/server';
import axiosInstance from '../../../utils/axiosInstance';

export async function GET() {
  try {
    const response = await axiosInstance.get('field/customfield_10038/context/10142/option');
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error.response ? error.response.data : error.message);
    return NextResponse.json(
      { message: error.response ? error.response.data.message : 'Internal Server Error' },
      { status: error.response ? error.response.status : 500 }
    );
  }
}
