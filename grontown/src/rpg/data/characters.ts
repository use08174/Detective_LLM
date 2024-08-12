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
    sprite: "mei_lin",
    photo: "assets/photos/sumin_shim.jpeg",
    interactTopic: Topics.enterChat,
  }),

  David: createCharacter({
    eastworldId: "David",
    sprite: "police_officer",
    photo: "assets/photos/david.jpeg",
    interactTopic: Topics.enterChat,
  }),

  Kim: createCharacter({
    eastworldId: "Kim",
    sprite: "police_officer",
    photo: "assets/photos/kim.jpg",
    interactTopic: Topics.enterChat,
  }),

  Woohyun: createCharacter({
    eastworldId: "Woohyun",
    sprite: "police_officer",
    photo: "assets/photos/woohyun_jo.jpg",
    interactTopic: Topics.enterChat,
  }),

  Soyeon: createCharacter({
    eastworldId: "Soyeon",
    sprite: "police_officer",
    photo: "assets/photos/soyeon_bae.jpeg",
    interactTopic: Topics.enterChat,
  }),

  Jiyoon: createCharacter({
    eastworldId: "Jiyoon",
    sprite: "police_officer",
    photo: "assets/photos/jiyoon_jeon.jpeg",
    interactTopic: Topics.enterChat,
  }),

  Eunha: createCharacter({
    eastworldId: "Eunha",
    sprite: "police_officer",
    photo: "assets/photos/eunha_seo.jpeg",
    interactTopic: Topics.enterChat,
  }),
};

export default characters;
