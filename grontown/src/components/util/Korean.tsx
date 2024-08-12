type TranslationMap = {
  [key: string]: string;
};

// EnglishToKorean 객체
const _EnglishToKorean: TranslationMap = {
  "Detective": "탐정",
  "Sumin": "심수민",
  "Woohyun": "조우현",
  "Kim": "김담임",
  "David": "데이비드",
  "Soyeon": "배소연",
  "Jiyoon": "전지윤",
  "Eunha": "서은하"
};

// KoreanToEnglish 객체
const _KoreanToEnglish: TranslationMap = {
  "탐정": "Detective",
  "심수민": "Sumin",
  "조우현": "Woohyun",
  "김담임": "Kim",
  "데이비드": "David",
  "배소연": "Soyeon",
  "전지윤": "Jiyoon",
  "서은하": "Eunha"
};

// If can't find the key, return ""
const translate = (map: TranslationMap, key: string): string => {
  return map[key] || "";
};


const KoreanToEnglish = (key: string): string => {
  return translate(_KoreanToEnglish, key);
}

const EnglishToKorean = (key: string): string => {
  return translate(_EnglishToKorean, key);
}

export { EnglishToKorean, KoreanToEnglish };