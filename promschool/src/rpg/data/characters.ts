import Topics from "./topics";

export type Action = {
  name: string;
  startFrame: number;
  endFrame: number;
  frameRate?: number;
};

export type Character = {
  eastworldId: string | null;
  sprite: string;
  photo: string;
  interactTopic: Topics;
  actions: Array<Action>;
  arrestable: boolean;
};

type PartialCharacter = Partial<Character>;

const defaultCharacter: Character = {
  eastworldId: null,
  sprite: "",
  photo: "",
  interactTopic: Topics.enterChat,
  actions: [],
  arrestable: true,
};

function createCharacter(partial: PartialCharacter): Character {
  return { ...defaultCharacter, ...partial };
}

const characters: Record<string, Character> = {
  detective: createCharacter({
    eastworldId: "Detective",
    sprite: "detective",
    photo: "assets/photos/detective.jpeg",
    arrestable: false,
  }),

  Sumin: createCharacter({
    eastworldId: "Sumin",
    sprite: "sumin_shim",
    photo: "assets/photos/sumin_shim.jpeg",
    interactTopic: Topics.enterChat,
  }),

  David: createCharacter({
    eastworldId: "David",
    sprite: "david",
    photo: "assets/photos/david.jpeg",
    interactTopic: Topics.enterChat,
  }),
  Kim: createCharacter({
    eastworldId: "Kim",
    sprite: "kim",
    photo: "assets/photos/kim.jpg",
    interactTopic: Topics.enterChat,
  }),

  Woohyun: createCharacter({
    eastworldId: "Woohyun",
    sprite: "woohyun_jo",
    photo: "assets/photos/woohyun_jo.jpg",
    interactTopic: Topics.enterChat,
  }),

  Soyeon: createCharacter({
    eastworldId: "Soyeon",
    sprite: "soyeon_bae",
    photo: "assets/photos/soyeon_bae.jpeg",
    interactTopic: Topics.enterChat,
  }),

  Jiyoon: createCharacter({
    eastworldId: "Jiyoon",
    sprite: "jiyoon_jeon",
    photo: "assets/photos/jiyoon_jeon.jpeg",
    interactTopic: Topics.enterChat,
  }),

  Eunha: createCharacter({
    eastworldId: "Eunha",
    sprite: "eunha_seo",
    photo: "assets/photos/eunha_seo.jpeg",
    interactTopic: Topics.enterChat,
  }),

  Police: createCharacter({
    eastworldId: "Police",
    sprite: "police_officer",
    photo: "assets/photos/eunha_seo.jpeg",
    interactTopic: Topics.enterArrestModal,
  }),
};

export default characters;
