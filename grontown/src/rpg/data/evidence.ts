// type Evidence = {
//   text: string;
//   photo: string;
//   sprite: string;
// };

// const evidence: Record<string, Evidence> = {};

const evidence = {
  cassette: {
    text: "어떻게 구했는지도 모르는 카세트 플레이어에서 NCT의 Baggy Jeans가 흘러나오고 있다. 아마도 조우현이 연습을 하던 노래인 것 같다.",
    photo: "assets/photos/cassette.jpg",
    sprite: "cassette",
  },
  drink: {
    text: `<사랑의 묘약> 
    
    화학 동아리 부스에서 팔던 음료수이다.`,
    photo: "assets/photos/drink.jpg",
    sprite: "drink",
  },
  newspaper: {
    text: `프메 고등학교 교내 신문이다. 
    
    속보 : 프메 고등학교 학생회장 정OO 군이 사실은 스테로이드 복용자임이 밝혀져 충격을 주고 있다.`,
    photo: "assets/photos/newspaper.jpeg",
    sprite: "newspaper",
  },
  pill: {
    text: `고혈압약이다.
    
    주의사항 : 스테로이드와 함께 복용 시 심장에 무리가 올 수 있으니 꼭 전문가의 처방 후 사용바랍니다.`,
    photo: "assets/photos/pill.jpeg",
    sprite: "pill",
  },
  trashcan: {
    text: "무대 옆에 있는 쓰레기통, 음료를 담았던 플라스틱 컵이 가득하다.",
    photo: "assets/photos/trashcan.jpg",
    sprite: "trashcan",
  },
};

export default evidence;
