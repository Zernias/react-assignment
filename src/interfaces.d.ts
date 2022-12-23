interface INote {
  description: string;
  title: string;
  id: number;
  date: Date;
}
interface IProtectedRoute {
  loggedIn: boolean;
  children: any;
}