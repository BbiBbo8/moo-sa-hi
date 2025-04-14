export interface Shelter {
  name: string;
  address: string;
  lat: number;
  lng: number;
  capacity: number;
  scale: string;
  manager: string;
  phone: string;
  locationType: string;
  isOpen: string;
  usageType: string;
}

export interface ShelterApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Array<{
          FCLT_NM: string; //시설명
          FCLT_ADDR_RONA: string; //시설주소도로명
          FCLT_ADDR_LOTNO: string; //시설주소지번
          LAT_PROVIN: string; //위도도
          LAT_MIN: string; //위도분
          LAT_SEC: string; //위도초
          LOT_PROVIN: string; //경도도
          LOT_MIN: string; //경도분
          LOT_SEC: string; //경도초
        }>;
      };
    };
  };
}
