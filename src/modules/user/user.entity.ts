export class User {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;

  static defaultSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    password: false,
  };

  static selectWithPassword = {
    ...User.defaultSelect,
    password: true,
  };
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
