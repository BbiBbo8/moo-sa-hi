import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const API_KEY = process.env.SAFETY_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'API 키가 누락되었습니다.' }, { status: 500 });
  }

  try {
    const res = await axios.get('https://www.safetydata.go.kr/V2/api/DSSP-IF-00195', {
      params: {
        serviceKey: API_KEY,
        returnType: 'json',
        pageNo: 1,
        numOfRows: 1000,
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('[Shelter API ERROR]', error);
    return NextResponse.json({ error: '외부 API 요청 실패' }, { status: 500 });
  }
}