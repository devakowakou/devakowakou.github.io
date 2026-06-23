import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Linkedin, Github, Headset, Loader2, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../../config/personal';
import { blink } from '../../lib/blink';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const updateField = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (status === 'error') setStatus('idle');
    };

  const resetForm = () => {
    setForm({ name: '', email: '', message: '' });
    setStatus('idle');
    setErrorMsg('');
  };

  const closeModal = () => {
    setIsOpen(false);
    // Clear a completed submission so the form is fresh next time it opens.
    if (status === 'success') resetForm();
  };

  // While the modal is open, close on Escape and lock background scrolling.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('All fields are required.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const { success } = await blink.notifications.email({
        to: personalInfo.email,
        replyTo: email,
        subject: `New portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      });

      if (!success) throw new Error('The mail server rejected the request.');
      setStatus('success');
    } catch (err) {
      // Surface the raw error for debugging but keep the UI message friendly.
      console.error('Contact form submission failed:', err);
      setStatus('error');
      setErrorMsg("Couldn't send your message right now. Please email me directly instead.");
    }
  };

  const isSending = status === 'sending';

  return (
    <section 
      className="min-h-[50vh] flex flex-col justify-center items-center border-t-4 border-white py-20 overflow-hidden relative"
      data-bgcolor="#000000"
    >
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-mono">
          Ready to break the internet?
        </h2>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email Amour Akowakou"
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
          >
            <Mail size={32} aria-hidden="true" />
          </motion.a>
          <motion.a
            href={`tel:${personalInfo.phone}`}
            aria-label="Call Amour Akowakou"
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
          >
            <Headset size={32} aria-hidden="true" />
          </motion.a>
          <motion.a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Amour Akowakou on LinkedIn (opens in a new tab)"
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
          >
            <Linkedin size={32} aria-hidden="true" />
          </motion.a>
          <motion.a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Amour Akowakou on GitHub (opens in a new tab)"
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400"
          >
            <Github size={32} aria-hidden="true" />
          </motion.a>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#39FF14", color: "#000" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="w-full md:w-3/4 mx-auto text-5xl md:text-8xl font-black py-12 md:py-20 border-4 border-white bg-transparent text-white shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-[16px_16px_0px_0px_rgba(57,255,20,1)] hover:border-black transition-all duration-300 uppercase font-sans tracking-tighter focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#39FF14]"
        >
          Let's Talk
        </motion.button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
              className="relative w-full max-w-2xl bg-secondary border-4 border-black shadow-[16px_16px_0px_0px_#000000] p-0 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-black text-white p-3 flex justify-between items-center border-b-4 border-black">
                <span id="contact-modal-title" className="font-mono font-bold text-lg blinking-cursor">user@devakowakou:~/contact-form</span>
                <button
                  type="button"
                  aria-label="Close contact form"
                  onClick={closeModal}
                  className="hover:bg-red-500 hover:text-black transition-colors rounded-sm p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Raw Form */}
              <div className="p-8 font-mono">
                {status === 'success' ? (
                  <div className="text-center py-8 space-y-4" role="status">
                    <CheckCircle2 size={64} className="mx-auto" aria-hidden="true" />
                    <p className="text-2xl font-black uppercase">Message transmitted</p>
                    <p className="text-base font-medium">Thanks for reaching out — I'll reply to your inbox soon.</p>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-black text-white text-lg font-bold px-8 py-3 border-2 border-black hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_#000] transition-all uppercase focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block font-bold text-lg uppercase border-b-2 border-black w-max">Identity</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={updateField('name')}
                        disabled={isSending}
                        placeholder="Who are you?"
                        className="w-full bg-white border-2 border-black p-4 text-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow placeholder:text-gray-400 disabled:opacity-60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block font-bold text-lg uppercase border-b-2 border-black w-max">Coordinates</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={updateField('email')}
                        disabled={isSending}
                        placeholder="email@address.com"
                        className="w-full bg-white border-2 border-black p-4 text-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow placeholder:text-gray-400 disabled:opacity-60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="block font-bold text-lg uppercase border-b-2 border-black w-max">Payload</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        value={form.message}
                        onChange={updateField('message')}
                        disabled={isSending}
                        placeholder="What's the mission?"
                        className="w-full bg-white border-2 border-black p-4 text-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow placeholder:text-gray-400 resize-none disabled:opacity-60"
                      />
                    </div>

                    {status === 'error' && (
                      <p role="alert" className="bg-red-500 text-white font-bold p-3 border-2 border-black">
                        ! {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-black text-white text-xl font-bold py-4 border-2 border-black hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_0px_#000] transition-all flex items-center justify-center gap-2 uppercase focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white disabled:hover:shadow-none"
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={24} className="animate-spin" aria-hidden="true" />
                          Transmitting…
                        </>
                      ) : (
                        <>
                          <Send size={24} aria-hidden="true" />
                          Transmit Data
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
