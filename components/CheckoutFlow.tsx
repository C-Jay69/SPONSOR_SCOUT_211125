import React, { useState } from 'react';
import { Button, Card, Badge } from './Shared';
import { ViewState, Order } from '../types';
import { CheckCircle, CreditCard, ArrowRight } from 'lucide-react';

export const CheckoutFlow: React.FC<{ 
  setView: (v: ViewState) => void, 
  onCreateOrder: (order: Partial<Order>) => void 
}> = ({ setView, onCreateOrder }) => {
  const [step, setStep] = useState<'SELECTION' | 'PAYMENT' | 'DETAILS'>('SELECTION');
  const [selectedPack, setSelectedPack] = useState<'basic' | 'pro'>('pro');
  const [addOn, setAddOn] = useState(false);

  const [formData, setFormData] = useState({
    niche: '',
    subniche: '',
    geography: 'Global',
    email: '',
    instructions: ''
  });

  const handlePayment = () => {
    // Simulate Stripe Processing
    setTimeout(() => {
      setStep('DETAILS');
    }, 1000);
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateOrder({
      package_type: selectedPack,
      niche: formData.niche,
      subniche: formData.subniche,
      geography: formData.geography,
      add_on_refresh: addOn,
      customer_email: formData.email,
      leads_requested: selectedPack === 'basic' ? 100 : 250,
      price: (selectedPack === 'basic' ? 99 : 249) + (addOn ? 39 : 0)
    });
  };

  if (step === 'SELECTION') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-black text-center mb-12">Select Your Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Basic */}
          <Card className={`relative cursor-pointer transition-all ${selectedPack === 'basic' ? 'ring-4 ring-black scale-105 z-10' : 'hover:bg-gray-50'}`} onClick={() => setSelectedPack('basic')}>
            <h3 className="text-2xl font-black">Basic Scout</h3>
            <div className="text-4xl font-black my-4">$99<span className="text-lg font-normal text-gray-500">/one-time</span></div>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-2"><CheckCircle size={20} /> 100 Verified Leads</li>
              <li className="flex gap-2"><CheckCircle size={20} /> 7-Day Replacement</li>
              <li className="flex gap-2"><CheckCircle size={20} /> Standard CSV Export</li>
            </ul>
            {selectedPack === 'basic' && <Badge color="bg-[#FFBF00] absolute top-4 right-4">SELECTED</Badge>}
          </Card>

          {/* Pro */}
          <Card className={`relative cursor-pointer bg-blue-50 transition-all ${selectedPack === 'pro' ? 'ring-4 ring-[#0000FF] scale-105 z-10 shadow-[8px_8px_0px_0px_rgba(0,0,255,1)]' : 'hover:bg-blue-100'}`} onClick={() => setSelectedPack('pro')}>
            <Badge color="bg-[#FF00FF] absolute -top-3 left-1/2 -translate-x-1/2 text-white">MOST POPULAR</Badge>
            <h3 className="text-2xl font-black text-[#0000FF]">Pro Hunter</h3>
            <div className="text-4xl font-black my-4">$249<span className="text-lg font-normal text-gray-500">/one-time</span></div>
            <ul className="space-y-3 mb-6 font-medium">
              <li className="flex gap-2"><CheckCircle size={20} /> 250 Verified Leads</li>
              <li className="flex gap-2"><CheckCircle size={20} className="text-[#0000FF]" /> <b>"Why Fit"</b> Personalized Notes</li>
              <li className="flex gap-2"><CheckCircle size={20} /> Priority 24h Delivery</li>
              <li className="flex gap-2"><CheckCircle size={20} /> Outreach Templates Included</li>
            </ul>
             {selectedPack === 'pro' && <Badge color="bg-[#0000FF] text-white absolute top-4 right-4">SELECTED</Badge>}
          </Card>
        </div>

        {/* Addon */}
        <div className="mt-8 max-w-2xl mx-auto">
           <Card className={`flex items-center justify-between cursor-pointer border-dashed ${addOn ? 'bg-yellow-50 border-[#FFBF00]' : ''}`} onClick={() => setAddOn(!addOn)}>
             <div className="flex items-center gap-4">
                <div className={`w-6 h-6 border-2 border-black ${addOn ? 'bg-[#FFBF00]' : 'bg-white'}`}></div>
                <div>
                  <h4 className="font-bold text-lg">Add: Monthly Refresh (+39/mo)</h4>
                  <p className="text-sm text-gray-600">Get 30 new fresh leads every month automatically.</p>
                </div>
             </div>
           </Card>
        </div>

        <div className="text-center mt-12">
          <Button className="text-xl w-full max-w-md" onClick={() => setStep('PAYMENT')}>
            Proceed to Checkout (${(selectedPack === 'basic' ? 99 : 249) + (addOn ? 39 : 0)})
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'PAYMENT') {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <Card className="bg-gray-50">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><CreditCard /> Secure Checkout</h2>
          <div className="space-y-4 mb-8">
            <div className="h-10 bg-white border border-gray-300 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-10 w-1/2 bg-white border border-gray-300 rounded animate-pulse"></div>
              <div className="h-10 w-1/2 bg-white border border-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 bg-white border border-gray-300 rounded animate-pulse"></div>
          </div>
          <Button className="w-full flex justify-center gap-2" onClick={handlePayment}>
             Pay ${(selectedPack === 'basic' ? 99 : 249) + (addOn ? 39 : 0)} Now <ArrowRight />
          </Button>
          <p className="text-center text-xs text-gray-500 mt-4">
            This is a secure 256-bit SSL encrypted payment (Simulated for Demo).
          </p>
        </Card>
        <button onClick={() => setStep('SELECTION')} className="block mx-auto mt-4 text-sm underline text-gray-500">Back</button>
      </div>
    );
  }

  // DETAILS
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 border-2 border-black text-green-600">
           <CheckCircle size={32} />
         </div>
         <h2 className="text-3xl font-black">Payment Successful!</h2>
         <p className="text-gray-600">Tell us who you want to target so we can start scouting.</p>
      </div>
      
      <Card>
        <form onSubmit={handleSubmitDetails} className="space-y-6">
          <div>
            <label className="block font-bold mb-2">Your Niche (Broad)</label>
            <input 
              required
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
              placeholder="e.g. Real Estate Investing, Knitting, Crypto"
              value={formData.niche}
              onChange={e => setFormData({...formData, niche: e.target.value})}
            />
          </div>
           <div>
            <label className="block font-bold mb-2">Sub-niche (Specific)</label>
            <input 
              required
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
              placeholder="e.g. Flipping houses in Ohio"
              value={formData.subniche}
              onChange={e => setFormData({...formData, subniche: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block font-bold mb-2">Geography</label>
                <select 
                  className="w-full p-3 border-2 border-black bg-white"
                  value={formData.geography}
                  onChange={e => setFormData({...formData, geography: e.target.value})}
                >
                  <option>Global</option>
                  <option>USA Only</option>
                  <option>Europe</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
            </div>
             <div>
               <label className="block font-bold mb-2">Leads Target</label>
               <div className="w-full p-3 border-2 border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed">
                 {selectedPack === 'basic' ? 100 : 250}
               </div>
            </div>
          </div>
          <div>
            <label className="block font-bold mb-2">Delivery Email</label>
            <input 
              required
              type="email"
              className="w-full p-3 border-2 border-black"
              placeholder="you@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Special Instructions (Optional)</label>
            <textarea 
              className="w-full p-3 border-2 border-black h-24"
              placeholder="e.g. Avoid gambling sponsors, prefer SaaS companies."
              value={formData.instructions}
              onChange={e => setFormData({...formData, instructions: e.target.value})}
            />
          </div>
          <Button type="submit" className="w-full text-lg">Start Order</Button>
        </form>
      </Card>
    </div>
  );
};
