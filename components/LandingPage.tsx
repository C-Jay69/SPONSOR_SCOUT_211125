import React, { useState } from 'react';
import { Button, Card, Badge } from './Shared';
import { ViewState } from '../types';
import { Check, Zap, ShieldCheck, Search, Download } from 'lucide-react';

const SAMPLE_DATA = [
  { brand: "EquityMultiple", web: "equitymultiple.com", contact: "Daniel S.", role: "Head of Growth", fit: "Real Estate Crowdfunding" },
  { brand: "DealMachine", web: "dealmachine.com", contact: "David L.", role: "Marketing Director", fit: "PropTech for Investors" },
  { brand: "Rocket Dollar", web: "rocketdollar.com", contact: "Sarah J.", role: "Partnerships", fit: "Self-Directed IRA" },
  { brand: "Baselane", web: "baselane.com", contact: "Mike R.", role: "CMO", fit: "Landlord Banking" },
  { brand: "RentRedi", web: "rentredi.com", contact: "Jessica T.", role: "Affiliate Mgr", fit: "Property Management" },
];

export const LandingPage: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    { q: "How accurate are the emails?", a: "We verify every email via SMTP checks and cross-reference with LinkedIn. If it bounces, we replace it." },
    { q: "What if I don't like the leads?", a: "We offer a 100% replacement guarantee for any invalid or irrelevant leads within 7 days." },
    { q: "How fast is delivery?", a: "Usually 24-48 hours. For complex niches, it might take up to 72 hours as we manually verify checks." },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero */}
      <header className="flex flex-col items-center text-center px-4 mt-12 md:mt-24 max-w-4xl mx-auto">
        <Badge color="bg-[#00FFFF]">FOR CREATORS & PODCASTERS</Badge>
        <h1 className="text-5xl md:text-7xl font-black text-black mt-6 leading-tight">
          Get <span className="text-[#0000FF]">100–250</span> Verified Sponsor Leads in <span className="text-[#FF00FF]">24 Hours</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-700 mt-6 max-w-2xl">
          Stop wasting time on LinkedIn. We scrape, verify, and score high-paying sponsors for your specific niche.
        </p>
        <div className="mt-10 flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Button variant="primary" className="text-lg px-10" onClick={() => setView('CHECKOUT_SELECTION')}>
            Get My List
          </Button>
          <Button variant="outline" className="text-lg px-10" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth'})}>
            How It Works
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-green-700">
          <ShieldCheck size={18} /> 100% Verified Emails
        </div>
      </header>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: "1. You Order", desc: "Tell us your niche (e.g., 'Real Estate Investing') and target count." },
            { icon: Zap, title: "2. We Scout", desc: "Our AI + Human team scrapes 10k+ data points to find active spenders." },
            { icon: Download, title: "3. You Pitch", desc: "Get a verified CSV with names, emails, and 'Why Fit' notes." }
          ].map((step, i) => (
            <Card key={i} className="flex flex-col items-start h-full">
              <div className="bg-[#FF00FF] p-3 border-2 border-black mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <step.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Sample Preview */}
      <section className="bg-white border-y-2 border-black py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-8 text-center">Real Data. Real Sponsors.</h2>
          <div className="overflow-x-auto border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-[#0000FF] text-white border-b-2 border-black">
                  <th className="p-4 font-bold uppercase text-sm">Brand</th>
                  <th className="p-4 font-bold uppercase text-sm">Website</th>
                  <th className="p-4 font-bold uppercase text-sm hidden md:table-cell">Contact</th>
                  <th className="p-4 font-bold uppercase text-sm hidden md:table-cell">Role</th>
                  <th className="p-4 font-bold uppercase text-sm">Why Fit</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-blue-50 text-sm">
                    <td className="p-4 font-bold">{row.brand}</td>
                    <td className="p-4 text-blue-600 underline">{row.web}</td>
                    <td className="p-4 hidden md:table-cell">{row.contact}</td>
                    <td className="p-4 hidden md:table-cell text-gray-500">{row.role}</td>
                    <td className="p-4"><Badge color="bg-[#00FFFF]">{row.fit}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-gray-100 p-3 text-center text-xs font-mono border-t-2 border-black">
              + 245 more rows in PRO plan
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-10 text-center">Creators Getting Paid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { text: "I closed a $5k deal in week one using this list. The 'Why Fit' notes saved me hours of research.", author: "Jake T., RE Podcast Host" },
            { text: "Finally, a list that isn't just generic info@ emails. These are real decision makers.", author: "Sarah Jenkins, YouTube Tech" },
            { text: "Worth every penny. My ROI on the $249 pack was about 20x within a month.", author: "Mike Ross, Crypto Daily" },
            { text: "The best part is the refresh add-on. I get new leads every month automatically.", author: "Elena V., Lifestyle Blogger" }
          ].map((t, i) => (
            <Card key={i}>
              <p className="text-lg font-medium mb-4">"{t.text}"</p>
              <p className="font-bold text-[#0000FF]">- {t.author}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-black mb-8 text-center">FAQ</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => (
            <div key={i} className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <button 
                className="w-full p-4 text-left font-bold flex justify-between items-center"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                {f.q}
                <span>{faqOpen === i ? '-' : '+'}</span>
              </button>
              {faqOpen === i && (
                <div className="p-4 pt-0 text-gray-600 border-t-2 border-black bg-gray-50">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FFBF00] py-16 border-y-2 border-black text-center px-4">
        <h2 className="text-4xl font-black mb-6">Ready to land your next sponsor?</h2>
        <Button variant="secondary" className="text-xl px-12" onClick={() => setView('CHECKOUT_SELECTION')}>
          Start Scouting
        </Button>
      </section>

       {/* Footer */}
       <footer className="py-8 text-center text-gray-500 text-sm">
          <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          © 2024 LIFEJACKET AI. All rights reserved.
        </footer>
    </div>
  );
};
