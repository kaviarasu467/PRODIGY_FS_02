
import React, { useMemo, useState, useEffect } from 'react';
import { Employee, DashboardStats } from '../types';
import { geminiService } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  employees: Employee[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

const Dashboard: React.FC<DashboardProps> = ({ employees }) => {
  const [insight, setInsight] = useState<string>('Analyzing your workforce...');

  useEffect(() => {
    const fetchInsight = async () => {
      if (employees.length > 0) {
        const text = await geminiService.getHRInsights(employees);
        setInsight(text);
      }
    };
    fetchInsight();
  }, [employees]);

  const stats = useMemo(() => {
    const total = employees.length;
    const avgSalary = total ? employees.reduce((acc, curr) => acc + curr.salary, 0) / total : 0;
    
    const deptMap: Record<string, number> = {};
    const statusMap: Record<string, number> = {};

    employees.forEach(emp => {
      deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
      statusMap[emp.status] = (statusMap[emp.status] || 0) + 1;
    });

    return {
      totalEmployees: total,
      averageSalary: Math.round(avgSalary),
      departmentDistribution: Object.entries(deptMap).map(([name, count]) => ({ name, count })),
      statusDistribution: Object.entries(statusMap).map(([name, count]) => ({ name, count })),
    };
  }, [employees]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-users text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Employees</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalEmployees}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-sack-dollar text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Average Salary</p>
            <h3 className="text-2xl font-bold text-slate-800">${stats.averageSalary.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-brain text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">AI Workforce Insight</p>
            <p className="text-xs text-slate-600 italic leading-tight mt-1">{insight}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Departmental Headcount</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.departmentDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {stats.departmentDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Employee Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {stats.statusDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
