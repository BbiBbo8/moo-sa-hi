import axios from 'axios';

const fetchData = async () => {
  try {
    const res = await axios.get(
      'https://www.safetydata.go.kr//V2/api/DSSP-IF-00195',
      {
        params: {
          serviceKey: '68E27K47S9W1D8II',
          pageNo: 1,
          numOfRows: 1000, 
          returnType: 'json', 
        },
      }
    );

    console.log(res.data);
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
};

fetchData();