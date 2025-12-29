
export type Department = 'Engineering' | 'Marketing' | 'Sales' | 'Human Resources' | 'Finance' | 'Product';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  role: string;
  salary: number;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  skills: string[];
  bio?: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'Admin' | 'Manager';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface DashboardStats {
  totalEmployees: number;
  averageSalary: number;
  departmentDistribution: { name: string; count: number }[];
  statusDistribution: { name: string; count: number }[];
}
