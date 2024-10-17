import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WilayaData } from '../types';
import { loadWilayaData } from '../data';
import { useAuth } from '../auth/AuthContext';

const WilayaList: React.FC = () => {
  const [wilayaData, setWilayaData] = useState<WilayaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadWilayaData().then((data) => {
      if (user?.role === 'user' && user.wilayaId) {
        setWilayaData(data.filter(w => w.id === user.wilayaId));
      } else {
        setWilayaData(data);
      }
      setLoading(false);
    });
  }, [user]);

  const handleWilayaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const wilayaId = event.target.value;
    setSelectedWilaya(wilayaId);
    if (wilayaId) {
      navigate(`/wilaya/${wilayaId}`);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">جاري تحميل البيانات...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">لوحات تحكم الولايات</h2>
      {user?.role === 'admin' && (
        <div className="mb-6">
          <label htmlFor="wilaya-select" className="block text-sm font-medium text-gray-700 mb-2">
            اختر ولاية
          </label>
          <select
            id="wilaya-select"
            value={selectedWilaya}
            onChange={handleWilayaChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">اختر ولاية</option>
            {wilayaData.map((wilaya) => (
              <option key={wilaya.id} value={wilaya.id}>
                {wilaya.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wilayaData.map((wilaya) => (
          <Link
            key={wilaya.id}
            to={`/wilaya/${wilaya.id}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold">{wilaya.name}</h3>
            <p className="text-gray-600">إجمالي التدخلات: {wilaya.totalInterventions}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WilayaList;