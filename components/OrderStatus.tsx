import React, { useEffect, useState } from 'react';
import { Button, Card, Badge } from './Shared';
import { Order, OrderStatus as Status } from '../types';
import { generateLeads } from '../services/geminiService';
import { Loader2, Check, Download, FileText, MessageSquare, Mail } from 'lucide-react';

interface Props {
  order: Order;
  onUpdateOrder: (o: Order) => void;
}

export const OrderStatusView: React.FC<Props> = ({ order, onUpdateOrder }) => {
  const [logs, setLogs] = useState<string[]>(order.logs || []);
  
  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev]);
  };

  useEffect(() => {
    if (order.status === Status.Complete) return;

    const processOrder = async () => {
      // Step 1: Collecting
      if (order.status === Status.Queued) {
        addLog(`[${new Date().toLocaleTimeString()}] Order received. Initializing n8n workflow...`);
        await new Promise(r => setTimeout(r, 1500));
        onUpdateOrder({ ...order, status: Status.Collecting, progress: 10 });
        addLog(`[${new Date().toLocaleTimeString()}] Scanning SerpAPI for niche: ${order.niche}...`);
      }

      // Step 2: Verifying (The Heavy Lifting)
      if (order.status === Status.Collecting) {
        await new Promise(r => setTimeout(r, 2000)); // Sim scraping time
        onUpdateOrder({ ...order, status: Status.Verifying, progress: 40 });
        addLog(`[${new Date().toLocaleTimeString()}] Found raw candidates. Beginning verification...`);
        
        // Trigger Gemini
        addLog(`[${new Date().toLocaleTimeString()}] AI analyzing fit for ${order.subniche}...`);
        const leads = await generateLeads(order.niche, order.subniche, 5); // Generating 5 for demo speed
        
        onUpdateOrder({ 
          ...order, 
          status: Status.Verifying, 
          progress: 80,
          leads: leads 
        });
        addLog(`[${new Date().toLocaleTimeString()}] Generated ${leads.length} verified leads.`);
      }

      // Step 3: Complete
      if (order.status === Status.Verifying && order.leads.length > 0) {
        await new Promise(r => setTimeout(r, 1500));
        addLog(`[${new Date().toLocaleTimeString()}] Formatting CSV...`);
        addLog(`[${new Date().toLocaleTimeString()}] Delivery sent to ${order.customer_email}`);
        onUpdateOrder({ 
          ...order, 
          status: Status.Complete, 
          progress: 100, 
          completed_at: new Date().toISOString(),
          logs: logs
        });
      }
    };

    processOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.status]);

  if (order.status !== Status.Complete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card className="text-center mb-8">
           <h2 className="text-2xl font-black mb-2">Scouting Your Sponsors...</h2>
           <p className="text-gray-600 mb-6">Order ID: <span className="font-mono">{order.id}</span></p>
           
           {/* Progress Bar */}
           <div className="w-full bg-gray-200 h-6 border-2 border-black mb-2 relative overflow-hidden">
             <div 
                className="h-full bg-[#00FFFF] transition-all duration-1000 ease-out"
                style={{ width: `${order.progress}%` }}
             ></div>
             {/* Striped animation overlay */}
             <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQUlEQVQYV2NkYGAwYcCA/0DMCkzEKnhl4SwGHBAbG6C7mBFLI/f///+MQJqRlZE0oCtG14yhm5GDCQyJzs5OhiRZAQCtHwoM+W70/AAAAABJRU5ErkJggg==')] opacity-20 animate-pulse"></div>
           </div>
           <div className="flex justify-between text-xs font-bold uppercase">
             <span className={order.progress > 0 ? 'text-black' : 'text-gray-400'}>Queued</span>
             <span className={order.progress > 30 ? 'text-black' : 'text-gray-400'}>Collecting</span>
             <span className={order.progress > 60 ? 'text-black' : 'text-gray-400'}>Verifying</span>
             <span className={order.progress === 100 ? 'text-black' : 'text-gray-400'}>Delivery</span>
           </div>
        </Card>

        {/* Logs */}
        <div className="bg-black text-green-400 p-4 font-mono text-sm h-64 overflow-y-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 border-b border-gray-800 pb-1 last:border-0">
              {'>'} {log}
            </div>
          ))}
          <div className="animate-pulse">{'>'} _</div>
        </div>
      </div>
    );
  }

  // DELIVERY PAGE
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Badge color="bg-green-400 text-black mb-2">ORDER COMPLETE</Badge>
          <h1 className="text-4xl font-black">Your Lead List is Ready</h1>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Download size={20} /> Download CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Data View */}
        <div className="lg:col-span-2">
          <div className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
             <div className="p-4 bg-gray-50 border-b-2 border-black font-bold flex justify-between">
                <span>Preview ({order.leads.length} Rows)</span>
                <span className="text-xs text-gray-500">Verified Just Now</span>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50 text-left">
                  <tr>
                    <th className="p-3 border-b border-gray-200">Company</th>
                    <th className="p-3 border-b border-gray-200">Contact</th>
                    <th className="p-3 border-b border-gray-200">Why Fit?</th>
                    <th className="p-3 border-b border-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order.leads.map((lead, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-bold">
                        {lead.brand_name}
                        <div className="text-xs text-blue-600 font-normal truncate max-w-[100px]">{lead.website_url}</div>
                      </td>
                      <td className="p-3">
                        {lead.contact_name}
                        <div className="text-xs text-gray-500">{lead.contact_email}</div>
                      </td>
                      <td className="p-3 text-xs max-w-xs text-gray-600">{lead.why_fit_note}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold text-xs uppercase">
                          <Check size={12} /> Valid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bonuses */}
        <div className="space-y-6">
          <Card className="bg-[#DCDFFD]">
            <h3 className="font-black text-xl mb-4">Included Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-[#0000FF] font-bold hover:underline">
                  <Mail size={18} /> Cold Email Templates
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-[#0000FF] font-bold hover:underline">
                  <FileText size={18} /> Sponsor Pitch Deck
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-[#0000FF] font-bold hover:underline">
                  <MessageSquare size={18} /> DM Scripts
                </a>
              </li>
            </ul>
          </Card>

           <Card>
            <h3 className="font-black text-lg mb-2">Need a refresh?</h3>
            <p className="text-sm text-gray-600 mb-4">Get 30 fresh leads for this niche next month for $39.</p>
            <Button variant="outline" className="w-full text-sm py-2">Subscribe to Refresh</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
