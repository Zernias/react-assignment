type NoteState = {
  token: string;
  listOfNotes: Array<any>;
  noteInputs: {
    title: string;
    description: string;
  };
  previewId: null | number;
  searchInput: string;
  isEditable: boolean;
};

type Note = {
  title: string;
  description: string;
  id: number;
  date: Date;
};

type Action = {
  type: string;
  payload?: any;
};

type UserCredentials = {
  username: string;
  encodedPassword: string;
};

type LoginState = {
  username: string;
  password: string;
  isLoading: boolean;
  error: string;
  isLogged: boolean;
  token: string;
};
