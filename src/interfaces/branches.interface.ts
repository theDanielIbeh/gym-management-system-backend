export interface Branch {
  _id?: string;
  name: string;
  location: string;
  admin: string;
  users: string[];
  equipment: string[];
  utility_cost: number;
  staff: string[];
}
