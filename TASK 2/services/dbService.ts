
import { Employee } from '../types';
import { APP_STORAGE_KEY, INITIAL_EMPLOYEES } from '../constants';

export const dbService = {
  getEmployees: (): Employee[] => {
    const data = localStorage.getItem(APP_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(INITIAL_EMPLOYEES));
      return INITIAL_EMPLOYEES;
    }
    return JSON.parse(data);
  },

  saveEmployee: (employee: Employee): void => {
    const employees = dbService.getEmployees();
    const index = employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      employees[index] = employee;
    } else {
      employees.push(employee);
    }
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(employees));
  },

  deleteEmployee: (id: string): void => {
    const employees = dbService.getEmployees();
    const filtered = employees.filter(e => e.id !== id);
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(filtered));
  }
};
