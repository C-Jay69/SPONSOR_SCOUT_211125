import React, { useState } from 'react';
import { Button, Card, Badge } from './Shared';
import { ViewState, Order, OrderStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Settings, LogOut, RefreshCcw } from 'lucide-react';

interface Props {
  orders: Order[];
  setView: (v: ViewState) => void;
}

const MOCK_REVENUE = [
  { name: 'Mon', val: 400 },
  { name: 'Tue', val: 300 },
  { name: 'Wed', val: 550 },
  { name: 'Thu', val: 900 },
  { name: 'Fri', val: 1200 },
  { name: 'Sat', val: 800 },
  { name: 'Sun', val: 1500 },
];

export const AdminPanel: React.FC<Props> = ({ orders, setView }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-8">
           <h2 className="text-2xl font-black mb-4">Admin Access</h2>
           <input 
            type="password" 
            className="w-full p-3 border-2 border-black mb-4"
            placeholder="Password (any works)"
            value={password}
            onChange={e => setPassword(e.target.value)}
           />
           <Button className="w-full" onClick={() => setIsLoggedIn(true)}>Login</Button>
           <button className="mt-4 text-sm text-gray-500 underline w-full" onClick={() => setView('LANDING')}>Back to Site</button>
        </Card>
      </div>
    );
  }

  const totalRevenue = orders.reduce((acc, o) => acc + o.price, 0) + 12450; // + mock historic

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="font-black text-xl tracking-tight">LIFEJACKET <span className="text-[#0000FF]">ADMIN</span></div>
        <div className="flex gap-4 items-center">
           <span className="text-xs text-gray-400">Logged as Owner</span>
           <button onClick={() => setIsLoggedIn(false)}><LogOut size={18} /></button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-sm text-gray-500 font-bold uppercase">Total Revenue</div>
            <div className="text-3xl font-black text-green-600">${totalRevenue.toLocaleString()}</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-500 font-bold uppercase">Orders (Today)</div>
            <div className="text-3xl font-black">{orders.length + 3}</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-500 font-bold uppercase">Avg Delivery Time</div>
            <div className="text-3xl font-black">2.4h</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-500 font-bold uppercase">Email Validity</div>
            <div className="text-3xl font-black text-[#0000FF]">98.2%</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <h3 className="font-bold mb-4">Weekly Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="val" fill="#0000FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
             <h3 className="font-bold mb-4">Order Volume</h3>
             <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_REVENUE}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Tooltip />
                   <Line type="monotone" dataKey="val" stroke="#FF00FF" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
             </div>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">Recent Orders</h3>
            <div className="flex gap-2">
               <Button variant="outline" className="py-1 px-3 text-xs"><Settings size={14} /> Settings</Button>
               <Button variant="outline" className="py-1 px-3 text-xs"><RefreshCcw size={14} /></Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b-2 border-black">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Niche</th>
                  <th className="p-3 text-left">Package</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 font-mono">{order.id.slice(0, 8)}...</td>
                    <td className="p-3">{order.customer_email}</td>
                    <td className="p-3">{order.niche}</td>
                    <td className="p-3 uppercase font-bold">{order.package_type}</td>
                    <td className="p-3">
                      <Badge color={order.status === OrderStatus.Complete ? 'bg-green-200' : 'bg-yellow-200'}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:underline mr-2">View</button>
                      <button className="text-red-600 hover:underline">Reset</button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">No live orders yet. Go create one!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
