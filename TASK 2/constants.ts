
import { Department } from './types';

export const DEPARTMENTS: Department[] = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Product',
];

export const APP_STORAGE_KEY = 'hr_pulse_data';
export const AUTH_STORAGE_KEY = 'hr_pulse_auth';

export const INITIAL_EMPLOYEES = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.c@hrtimes.com',
    department: 'Engineering' as Department,
    role: 'Senior Software Engineer',
    salary: 145000,
    joinDate: '2021-03-15',
    status: 'Active' as const,
    skills: ['React', 'TypeScript', 'Node.js'],
    bio: 'Experienced full-stack developer focusing on scalable cloud architectures.'
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@hrtimes.com',
    department: 'Human Resources' as Department,
    role: 'HR Manager',
    salary: 95000,
    joinDate: '2020-01-10',
    status: 'Active' as const,
    skills: ['Recruiting', 'Conflict Resolution', 'Compliance'],
    bio: 'People person dedicated to building inclusive workplace cultures.'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Blunt',
    email: 'emily.b@hrtimes.com',
    department: 'Marketing' as Department,
    role: 'Growth Lead',
    salary: 120000,
    joinDate: '2022-06-22',
    status: 'On Leave' as const,
    skills: ['SEO', 'Content Strategy', 'Analytics'],
    bio: 'Data-driven marketer with a passion for creative storytelling.'
  }
];
