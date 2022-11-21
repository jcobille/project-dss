export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  isActive?: boolean;
  isRoot?: boolean;
  password?: string;
}

export interface Actor {
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  image: string;
  movies?: Movie[];
}

export interface Movie {
  id?: string;
  title: string;
  description: string;
  releasedDate: string;
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
  releasedDate: string;
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
  postedDate?: string;
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

export interface PaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}
