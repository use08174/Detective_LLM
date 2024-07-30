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
    eastworldId: "Detective Samuel O'Connor",
    sprite: "detective",
    photo: "assets/photos/detective.jpeg",
    arrestable: false,
  }),
  Sumin: createCharacter({
    eastworldId: "Sumin",
    sprite: "mei_lin",
    photo: "assets/photos/mei_lin.jpeg",
  }),

  David: createCharacter({
    sprite: "police_officer",
    photo: "assets/photos/police_chief.jpeg",
    interactTopic: Topics.enterArrestModal,
    arrestable: false,
  }),

  Kim: createCharacter({
    sprite: "police_officer",
    photo: "assets/photos/police_chief.jpeg",
    interactTopic: Topics.enterArrestModal,
    arrestable: false,
  }),

  Woohyun: createCharacter({
    sprite: "police_officer",
    photo: "assets/photos/police_chief.jpeg",
    interactTopic: Topics.enterArrestModal,
    arrestable: false,
  }),

  Soyeon: createCharacter({
    sprite: "police_officer",
    photo: "assets/photos/police_chief.jpeg",
    interactTopic: Topics.enterArrestModal,
    arrestable: false,
  }),

  Jiyoon: createCharacter({
    sprite: "police_officer",
    photo: "assets/photos/police_chief.jpeg",
    interactTopic: Topics.enterArrestModal,
    arrestable: false,
  }),

  Eunha: createCharacter({
    sprite: "police_officer",
    photo: "assets/photos/police_chief.jpeg",
    interactTopic: Topics.enterArrestModal,
    arrestable: false,
  }),

  Letter: createCharacter({
    sprite: "police_officer",
    photo: "assets/photos/police_chief.jpeg",
    interactTopic: Topics.enterArrestModal,
    arrestable: false,
  }),
};

export default characters;
