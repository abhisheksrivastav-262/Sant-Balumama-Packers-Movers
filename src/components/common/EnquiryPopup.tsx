import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_NAME, PHONE_SECONDARY } from '@/data/constants';

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('House Shifting');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const sendEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = encodeURIComponent(
      `Hello ${COMPANY_NAME}, I would like to enquire about your services.\n` +
      `Name: ${name}\nMobile: ${phone}\nService: ${service}\nFrom: ${from}\nTo: ${to}`
    );
    window.open(`https://wa.me/91${PHONE_SECONDARY}?text=${message}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061B45]/70 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="enquiry-popup-title" className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={() => setOpen(false)} aria-label="Close enquiry form" className="absolute right-4 top-4 rounded-full p-2 text-[#667085] hover:bg-gray-100">
          <X size={20} />
        </button>
        <span className="eyebrow text-[#F47721]">Quick Enquiry</span>
        <h2 id="enquiry-popup-title" className="mt-2 pr-8 text-2xl font-extrabold text-[#17233D]">Plan your move with us</h2>
        <p className="mb-5 mt-2 text-sm text-[#667085]">Share a few details and send your enquiry directly to our WhatsApp.</p>
        <form onSubmit={sendEnquiry} className="grid gap-4 sm:grid-cols-2">
          <label className="form-label sm:col-span-1">Your name
            <input className="form-input mt-1" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
          </label>
          <label className="form-label sm:col-span-1">Mobile number
            <input className="form-input mt-1" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required pattern="[6-9][0-9]{9}" maxLength={10} placeholder="10-digit mobile" autoComplete="tel" />
          </label>
          <label className="form-label sm:col-span-2">Service required
            <select className="form-input mt-1" value={service} onChange={e => setService(e.target.value)}>
              <option>House Shifting</option>
              <option>Office Relocation</option>
              <option>Car & Bike Transportation</option>
              <option>Packing & Loading</option>
              <option>Other</option>
            </select>
          </label>
          <label className="form-label">Moving from
            <input className="form-input mt-1" value={from} onChange={e => setFrom(e.target.value)} required placeholder="Pickup area" />
          </label>
          <label className="form-label">Moving to
            <input className="form-input mt-1" value={to} onChange={e => setTo(e.target.value)} required placeholder="Destination" />
          </label>
          <button type="submit" className="btn-whatsapp mt-1 justify-center sm:col-span-2">
            <MessageCircle size={17} /> Send Enquiry on WhatsApp
          </button>
        </form>
      </section>
    </div>
  );
}
