type TranslationMap = {
  [key: string]: string;
};

// EnglishToKorean 객체
const _EnglishToKorean: TranslationMap = {
  "Detective": "김프메",
  "Sumin": "심수민",
  "Woohyun": "조우현",
  "Kim": "김담임",
  "David": "데이비드",
  "Soyeon": "배소연",
  "Jiyoon": "전지윤",
  "Eunha": "서은하",
  "trashcan": "쓰레기통",
  "pill": "알약",
  "newspaper": "신문",
  "cassette": "카세트",
  "drink": "음료수",
};

// KoreanToEnglish 객체
const _KoreanToEnglish: TranslationMap = {
  "김프메": "Detective",
  "심수민": "Sumin",
  "조우현": "Woohyun",
  "김담임": "Kim",
  "데이비드": "David",
  "배소연": "Soyeon",
  "전지윤": "Jiyoon",
  "서은하": "Eunha",
  "쓰레기통": "trashcan",
  "알약": "pill",
  "신문": "newspaper",
  "카세트": "cassette",
  "음료수": "drink",
};

// If can't find the key, return ""
const translate = (map: TranslationMap, key: string): string => {
  // if exists, return the value
  // if not, return the key
  if (map[key]) {
    return map[key];
  } else {
    return key;
  }
};


const KoreanToEnglish = (key: string): string => {
  return translate(_KoreanToEnglish, key);
}

const EnglishToKorean = (key: string): string => {
  return translate(_EnglishToKorean, key);
}

export { EnglishToKorean, KoreanToEnglish };