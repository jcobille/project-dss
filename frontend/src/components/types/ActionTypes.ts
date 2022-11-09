export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  isActive?: boolean;
  password?: string;
}

export interface Actor {
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  image: string;
}

export interface Movie {
  id?: string;
  title: string;
  description: string;
  released_date: string;
  duration: string;
  image: string;
  cost: string;
  actors?: Actor[];
  reviews?: Review[];
}

export interface Movies {
  id?: string;
  title: string;
  description: string;
  released_date: string;
  duration: string;
  image: string;
  cost: string;
}
export interface Review {
  id?: string;
  userId?: string;
  reviewScore: number;
  description: string;
  status?: string;
  movieId?: string;
  posted_date?: string;
  user?: User;
}

export interface BodyProps {
  type: string;
  changeModal: (type: string) => void;
  closeModal: (type: string) => void;
}

export interface ModalProps {
  id?: string;
  type: string;
  action?: string;
  setModalProps: (newType: string, newAction?: string, id?: string) => void;
}
