"use client"

import React, { useState, useEffect } from 'react';
import { 
  Check, ChevronRight, Zap, CreditCard, Layout, 
  Star, Plus, Minus, ShieldCheck, Smartphone, Mail 
} from 'lucide-react';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Handle Navbar Glass Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">I</div>
            <span className="font-semibold tracking-tight text-lg">Invoicr</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-600">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-black transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
          </div>

          <button className="bg-black text-white text-xs font-medium px-4 py-1.5 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <span className="text-[#f56300] font-semibold text-xs tracking-wide uppercase mb-4 inline-block">New Release 2.0</span>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.1] mb-6 text-[#1d1d1f]">
            Invoicing. <br />
            <span className="text-gray-400">Reimagined.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Create professional invoices in seconds. Get paid faster. <br className="hidden md:block"/>
            It’s the simplest way to manage your business finances.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="bg-[#0071e3] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#0077ed] transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
              Try it Free <ChevronRight size={16} />
            </button>
            <button className="text-[#0071e3] hover:underline font-medium text-base">
              View Demo
            </button>
          </div>
        </div>

        {/* 3D Tilt Mockup */}
        <div className="relative w-full max-w-4xl mx-auto perspective-1000 group">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/60 p-2 md:p-4 aspect-[16/10] overflow-hidden transform transition-transform duration-700 hover:rotate-x-2">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>
            </div>
            {/* Fake Interface Content */}
            <div className="mt-12 p-8 md:p-12 flex flex-col h-full">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500"><Zap /></div>
                <div className="text-right space-y-2">
                  <div className="h-4 w-32 bg-gray-100 rounded ml-auto"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded ml-auto"></div>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="h-8 w-1/3 bg-gray-100 rounded"></div>
                <div className="h-4 w-1/4 bg-gray-50 rounded"></div>
              </div>
              <div className="space-y-4 border-t border-gray-100 pt-8">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="flex justify-between items-center">
                     <div className="h-4 w-1/2 bg-gray-50 rounded"></div>
                     <div className="h-4 w-12 bg-gray-100 rounded"></div>
                   </div>
                ))}
              </div>
              <div className="mt-auto flex justify-end">
                 <div className="h-12 w-48 bg-[#1d1d1f] rounded-lg shadow-xl flex items-center justify-center text-white text-sm font-medium">Send Invoice</div>
              </div>
            </div>
          </div>
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 blur-3xl -z-10 opacity-40 rounded-[50%]"></div>
        </div>
      </section>

      {/* --- HOW IT WORKS (The 3 Steps) --- */}
      <section id="how-it-works" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">From zero to paid. Fast.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
             {[
               { icon: <Layout size={24}/>, title: "Create", desc: "Select a template, add your items, and customize the look in one click." },
               { icon: <Mail size={24}/>, title: "Send", desc: "Email directly to your client or share a secure link via text or Slack." },
               { icon: <CreditCard size={24}/>, title: "Get Paid", desc: "Accept credit cards or bank transfers. Money lands in your account instantly." }
             ].map((step, idx) => (
               <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 mb-6 group-hover:bg-[#0071e3] group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section id="features" className="py-24 px-6 bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Powerfully simple.</h2>
            <p className="text-gray-500 text-xl">Everything you need to run your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Feature 1: Main */}
            <div className="md:col-span-2 md:row-span-2 bg-white rounded-[30px] p-10 flex flex-col justify-between overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <Zap size={24} />
                </div>
                <h3 className="text-3xl font-semibold mb-3">Lightning Fast.</h3>
                <p className="text-gray-500 text-lg max-w-md">
                  Pre-saved clients and items mean you can generate and send an invoice in under 10 seconds.
                </p>
              </div>
              <div className="mt-8 relative h-64 w-full bg-[#f5f5f7] rounded-xl overflow-hidden">
                <div className="absolute top-6 left-6 right-6 bottom-0 bg-white rounded-t-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white"><Check size={16}/></div>
                        <div>
                          <p className="font-semibold text-sm">Invoice #1024 Paid</p>
                          <p className="text-xs text-gray-400">Just now via Apple Pay</p>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[100%] animate-pulse"></div>
                    </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Mobile */}
            <div className="bg-white rounded-[30px] p-8 flex flex-col items-center text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)] group hover:-translate-y-1 transition-transform duration-500">
              <Smartphone size={40} className="text-gray-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2">iOS & Android</h3>
              <p className="text-gray-500 text-sm">Manage business on the go with our native mobile apps.</p>
            </div>

            {/* Feature 3: Security */}
            <div className="bg-[#1d1d1f] rounded-[30px] p-8 flex flex-col text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <ShieldCheck size={40} className="text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
                <p className="text-gray-400 text-sm">256-bit SSL encryption keeps your data safe.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600 blur-[60px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Simple, transparent pricing.</h2>
            
            {/* Toggle */}
            <div className="inline-flex items-center bg-[#f5f5f7] rounded-full p-1 mb-10">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isAnnual ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
              >
                Yearly <span className="text-[#f56300] text-xs ml-1 font-bold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 md:p-10 rounded-[30px] border border-gray-100 bg-white flex flex-col hover:border-gray-300 transition-colors">
              <div className="mb-4">
                <span className="text-xs font-bold tracking-wider uppercase text-gray-500">Starter</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="text-gray-500 mb-8 h-12">Perfect for freelancers just starting out.</p>
              <button className="w-full py-3 rounded-full border border-gray-200 text-black font-medium hover:bg-gray-50 transition-colors mb-8">
                Get Started Free
              </button>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-center gap-3"><Check size={16} className="text-black"/> 3 Invoices per month</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-black"/> Basic Templates</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-black"/> Email Support</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="p-8 md:p-10 rounded-[30px] bg-[#1d1d1f] text-white flex flex-col shadow-2xl relative overflow-hidden ring-4 ring-gray-100">
              <div className="absolute top-0 right-0 bg-[#0071e3] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <div className="mb-4">
                <span className="text-xs font-bold tracking-wider uppercase text-gray-400">Pro</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">${isAnnual ? '12' : '15'}</span>
                <span className="text-gray-400">/mo</span>
              </div>
              <p className="text-gray-400 mb-8 h-12">For power users and small businesses.</p>
              <button className="w-full py-3 rounded-full bg-[#0071e3] text-white font-medium hover:bg-[#0077ed] transition-colors mb-8 shadow-lg shadow-blue-500/25">
                Start 14-Day Trial
              </button>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-3"><Check size={16} className="text-[#0071e3]"/> Unlimited Invoices</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-[#0071e3]"/> Custom Branding</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-[#0071e3]"/> Automated Reminders</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-[#0071e3]"/> Priority Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-16">Loved by creative pros.</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { quote: "It used to take me hours. Now it takes seconds. Simply the best.", author: "Sarah J.", role: "Photographer" },
                    { quote: "The design is so clean, my clients actually compliment my invoices.", author: "Mark T.", role: "UX Designer" },
                    { quote: "Finally, an invoicing tool that doesn't feel like a spreadsheet.", author: "Elena R.", role: "Consultant" }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex gap-1 text-[#f56300] mb-4">
                            <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                        </div>
                        <p className="text-lg text-gray-800 font-medium mb-6">"{item.quote}"</p>
                        <div>
                            <p className="font-semibold text-sm">{item.author}</p>
                            <p className="text-xs text-gray-500">{item.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">Questions? We have answers.</h2>
          <div className="space-y-4">
            {[
              { q: "Can I cancel anytime?", a: "Yes, absolutely. There are no contracts. You can cancel your subscription at any time with one click." },
              { q: "Is my data secure?", a: "We use 256-bit SSL encryption and store your data on secure servers. We never share your data with third parties." },
              { q: "Can I customize the invoice design?", a: "Yes! The Pro plan allows you to add your logo, change colors, and modify the layout to match your brand." },
              { q: "Do you support multiple currencies?", a: "Yes, Invoicr supports over 135 currencies and automatically handles conversion rates." }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4">
                <button 
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.q}</span>
                  {openFaq === index ? <Minus size={20} className="text-gray-400"/> : <Plus size={20} className="text-gray-400"/>}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-500 pb-4 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-32 px-6 bg-[#fbfbfd]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8 text-[#1d1d1f]">
            Get started. <br/>
            It’s free to try.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ed] transition-all w-full md:w-auto shadow-xl shadow-blue-500/20">
              Start your free trial
            </button>
            <button className="bg-white text-[#1d1d1f] px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 border border-gray-200 transition-all w-full md:w-auto">
              Contact Sales
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="mb-4 md:mb-0 flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-bold text-[10px]">I</div>
            &copy; 2025 Invoicr Inc.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;