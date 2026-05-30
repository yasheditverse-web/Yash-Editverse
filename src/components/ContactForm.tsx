import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ShieldCheck, DollarSign, Send, CheckCircle2, Ticket, Settings, Calendar, RefreshCcw } from 'lucide-react';
import { playClickSound, playTickSound, playSuccessSound } from '../utils/audio';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'short-video',
    budget: 99,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic estimate calculations
  const getTimelineScale = () => {
    switch (formData.serviceType) {
      case 'short-video':
        return { days: '24 Hours', revisions: '2 Rounds', deliverables: 'High Retention Short-form video (vertical MP4)' };
      case 'mid-video':
        return { days: '1-2 Days', revisions: '3 Rounds', deliverables: 'Polished medium-length edit (horizontal/vertical)' };
      case 'long-form':
        return { days: '3-4 Days', revisions: 'Unlimited Rounds', deliverables: 'Long Form Video Edit (30min - 1hr, max 1.10 hrs limit)' };
      case 'thumbnail-poster':
        return { days: '12-24 Hours', revisions: 'Unlimited Rounds', deliverables: 'High quality Poster / Thumbnail PSD + JPG' };
      default:
        return { days: '2-3 Days', revisions: '2 Rounds', deliverables: 'Finished high resolution deliverable' };
    }
  };

  const estimate = getTimelineScale();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Tactile tick on parameter tweak
    playTickSound();
    
    setFormData(prev => {
      let updatedBudget = prev.budget;
      if (name === 'serviceType') {
        if (value === 'short-video') updatedBudget = 99;
        else if (value === 'mid-video') updatedBudget = 149;
        else if (value === 'long-form') updatedBudget = 249;
        else if (value === 'thumbnail-poster') updatedBudget = 99;
      } else if (name === 'budget') {
        updatedBudget = Math.min(499, Number(value));
      }
      return {
        ...prev,
        [name]: value,
        budget: updatedBudget
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please complete all fields!');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API pipeline transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSuccessSound();
    }, 1200);
  };

  const handleReset = () => {
    playClickSound();
    setFormData({
      name: '',
      email: '',
      serviceType: 'short-video',
      budget: 99,
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#1a1a1a]/65 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-white/10 transition-all duration-300 font-sans">
      
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2 w-2 rounded-full bg-[#2dd4bf] animate-pulse"></span>
        <span className="text-xs font-semibold tracking-widest text-[#2dd4bf] uppercase font-mono">Project Planner & Quote Creator</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
        Let’s Work Together
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 font-light mb-8 max-w-xl">
        Adjust your parameters to construct an instant estimation of project timeline, revision scope, and direct tools recommended for your target outcome.
      </p>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="proposal-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Fields (LHS: 7 rows) */}
            <div className="md:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-semibold">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Mercer"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f0f] border border-white/5 focus:border-[#2dd4bf] focus:outline-none text-xs text-slate-200 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-semibold">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. alex@studio.com"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f0f] border border-white/5 focus:border-[#2dd4bf] focus:outline-none text-xs text-slate-200 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-300 font-semibold">Service Requirement</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f0f] border border-white/5 focus:border-[#2dd4bf] focus:outline-none text-xs text-slate-200 transition-colors cursor-pointer"
                >
                  <option value="short-video">Short Video Editing (Rs. 99)</option>
                  <option value="mid-video">Mid Video Editing (Rs. 149)</option>
                  <option value="long-form">Long Form Video Editing (30min - 1.10 hrs limit) (Rs. 249)</option>
                  <option value="thumbnail-poster">Thumbnail & Poster Designing (Adobe Photoshop) (Rs. 99)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-semibold">Allocated Budget</label>
                  <span className="text-xs font-mono font-bold text-[#2dd4bf]">
                    Rs. {formData.budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  name="budget"
                  min="99"
                  max="499"
                  step="5"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2dd4bf]"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Rs. 99 (Short Video)</span>
                  <span>Rs. 249 (Long Form)</span>
                  <span>Rs. 499 Max Cap</span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 bg-black/40 p-2.5 rounded-xl border border-white/5 leading-relaxed mt-2">
                  <span className="text-[#2dd4bf] font-bold">Note: </span>
                  Video length must be under the <span className="text-white font-semibold">1.10 hours limitation</span>. Total budget cannot exceed a maximum limit of <span className="text-white font-semibold">Rs. 499</span>.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-300 font-semibold">Project Brief & Details</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Outline your footage source, timeline constraints, target audio track & specific animations requested..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f0f] border border-white/5 focus:border-[#2dd4bf] focus:outline-none text-xs text-slate-200 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="btn-submit-proposal"
                className="w-full py-3 px-5 rounded-xl bg-[#2dd4bf] hover:bg-teal-400 text-[#0f0f0f] font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 select-none"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCcw className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing Brief...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Project Proposal</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Quote Receipt (RHS: 5 rows) */}
            <div className="md:col-span-5 bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/5">
                  <Ticket className="h-4.5 w-4.5 text-[#2dd4bf]" />
                  <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-white">Estimated Quote Config</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Service Code</span>
                  <span className="text-xs text-slate-100 font-semibold uppercase">{formData.serviceType}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Estimated Turnaround</span>
                  <span className="text-xs text-[#2dd4bf] font-bold">{estimate.days}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Milestone Reviews</span>
                  <span className="text-xs text-slate-100 font-semibold">{estimate.revisions}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Standard Scope Deliverables</span>
                  <span className="text-xs text-slate-300 font-light leading-relaxed block">
                    {estimate.deliverables}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#2dd4bf]" />
                  <span className="text-[10px] font-mono text-slate-400">Fixed rate delivery guarantee</span>
                </div>
                
                <div className="text-[10px] font-mono text-slate-400 bg-[#0f0f0f] p-2.5 rounded-lg border border-white/5 leading-relaxed font-light">
                  *This live estimate acts as a digital layout of standard workflows. Yash will correspond via email with draft agreements.
                </div>
              </div>
            </div>
          </motion.form>
        ) : (
          /* Successful Submission Receipt Ticket with motion animate-in */
          <motion.div
            key="success-receipt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0f0f0f]/60 border border-white/5 p-6 sm:p-8 rounded-2xl text-center max-w-lg mx-auto space-y-4"
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-[#2dd4bf]/15 border border-[#2dd4bf]/30 flex items-center justify-center text-[#2dd4bf]">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-white">Proposal Transmitted!</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-light">
                Amazing. Yash has received your project brief structure successfully! A tentative estimate ticket has been logged into our digital queue, and Yash will reach out to you at <span className="font-semibold text-white">{formData.email}</span> within 24 hours.
              </p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 text-left font-mono text-[11px] space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Client:</span>
                <span className="text-white font-bold">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Target Level:</span>
                 <span className="text-[#2dd4bf] uppercase font-bold">Rs. {formData.budget.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400">Timeline Scope:</span>
                <span className="text-white font-bold">{estimate.days}</span>
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold uppercase">Queued</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-mono text-slate-400 hover:text-white underline cursor-pointer"
            >
              Configure or send another task brief
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
