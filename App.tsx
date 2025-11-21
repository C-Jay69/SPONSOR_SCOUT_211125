import React, { useState } from 'react';
import { Navbar } from './components/Shared';
import { LandingPage } from './components/LandingPage';
import { CheckoutFlow } from './components/CheckoutFlow';
import { OrderStatusView } from './components/OrderStatus';
import { AdminPanel } from './components/AdminPanel';
import { Order, ViewState, OrderStatus } from './types';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const activeOrder = orders.find(o => o.id === activeOrderId);

  const handleCreateOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      id: uuidv4(),
      customer_email: orderData.customer_email || 'test@example.com',
      package_type: orderData.package_type || 'basic',
      niche: orderData.niche || 'General',
      subniche: orderData.subniche || 'General',
      geography: orderData.geography || 'Global',
      leads_requested: orderData.leads_requested || 100,
      add_on_refresh: orderData.add_on_refresh || false,
      status: OrderStatus.Queued,
      created_at: new Date().toISOString(),
      leads: [],
      price: orderData.price || 99,
      progress: 0,
      logs: []
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    setView('ORDER_STATUS');
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  return (
    <div className="min-h-screen font-sans text-black selection:bg-[#FF00FF] selection:text-white">
      {view !== 'ADMIN_DASHBOARD' && view !== 'ADMIN_LOGIN' && <Navbar setView={setView} />}

      <main>
        {view === 'LANDING' && <LandingPage setView={setView} />}
        
        {(view === 'CHECKOUT_SELECTION' || view === 'CHECKOUT_PAYMENT' || view === 'ORDER_FORM') && (
          <CheckoutFlow setView={setView} onCreateOrder={handleCreateOrder} />
        )}

        {(view === 'ORDER_STATUS' || view === 'DELIVERY') && activeOrder && (
          <OrderStatusView order={activeOrder} onUpdateOrder={handleUpdateOrder} />
        )}

        {(view === 'ADMIN_LOGIN' || view === 'ADMIN_DASHBOARD') && (
          <AdminPanel orders={orders} setView={setView} />
        )}
      </main>
    </div>
  );
}
