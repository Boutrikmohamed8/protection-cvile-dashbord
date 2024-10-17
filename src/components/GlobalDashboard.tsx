import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { globalStats } from '../data';

const GlobalDashboard: React.FC = () => {
  const chartData = [
    { name: 'التدخلات', value: globalStats.totalInterventions },
    { name: 'الوفيات', value: globalStats.totalDeaths },
    { name: 'الجرحى', value: globalStats.totalInjured },
    { name: 'المرضى', value: globalStats.totalPatients },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">الإحصائيات العامة</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {chartData.map((stat) => (
          <div key={stat.name} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{stat.name}</h3>
            <p className="text-3xl font-bold text-blue-600">{stat.value.toLocaleString('ar-DZ')}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">نظرة عامة</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GlobalDashboard;