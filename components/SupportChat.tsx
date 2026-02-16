
import React, { useState } from 'react';

interface SupportChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportChat: React.FC<SupportChatProps> = ({ isOpen, onClose }) => {
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;

    setIsSending(true);
    // Simulasi pengiriman ke server IT Support (Real IT)
    setTimeout(() => {
      setIsSending(false);
      setTicketSent(true);
      setTicketMessage('');
      
      // Reset status sukses setelah beberapa detik
      setTimeout(() => setTicketSent(false), 5000);
    }, 1200);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={onClose}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-slate-900 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60] group"
      >
        <span className="material-symbols-outlined text-2xl font-bold">headset_mic</span>
        <div className="absolute -top-10 right-0 bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-lg text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
          Bantuan IT
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[320px] sm:w-[350px] z-[70] animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col ring-1 ring-black/5">
        
        {/* Header - Compact */}
        <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-slate-900 text-xl font-bold">engineering</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm leading-tight">Bantuan IT</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Siap Membantu</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content - Compact Scrollable */}
        <div className="p-4 space-y-5 bg-slate-50/30 dark:bg-slate-900/10 max-h-[480px] overflow-y-auto custom-scrollbar">
          
          {/* Saluran Langsung - Berdampingan */}
          <div className="grid grid-cols-2 gap-2">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:border-primary transition-all group shadow-sm"
            >
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                <span className="material-symbols-outlined text-lg">chat</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">WhatsApp</p>
                <p className="text-[8px] text-slate-400 truncate tracking-tighter">Respon Cepat</p>
              </div>
            </a>

            <a 
              href="tel:12345" 
              className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 hover:border-primary transition-all group shadow-sm"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">Hotline</p>
                <p className="text-[8px] text-slate-400 truncate tracking-tighter">Lokal 101</p>
              </div>
            </a>
          </div>

          {/* Formulir Tiket - Desain Inline */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
              Kirim Tiket Bantuan
            </p>
            
            {ticketSent ? (
              <div className="py-4 flex flex-col items-center text-center space-y-2 animate-in fade-in zoom-in duration-200">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">check</span>
                </div>
                <p className="font-bold text-xs text-slate-700 dark:text-slate-200">Tiket Terkirim!</p>
                <button 
                  onClick={() => setTicketSent(false)}
                  className="text-[9px] font-bold text-primary hover:underline uppercase tracking-wider"
                >
                  Kirim Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendTicket} className="space-y-3">
                <textarea 
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Ceritakan kendala sistem Anda..."
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl py-2 px-3 text-[11px] focus:ring-1 focus:ring-primary focus:border-primary min-h-[70px] resize-none transition-all"
                  required
                ></textarea>
                <button 
                  type="submit"
                  disabled={isSending || !ticketMessage.trim()}
                  className="w-full bg-slate-900 dark:bg-primary dark:text-slate-900 text-white py-2.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  {isSending ? (
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Kirim Laporan</span>
                      <span className="material-symbols-outlined text-[14px]">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Layanan Mandiri - Daftar Kecil */}
          <div className="space-y-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Layanan Mandiri</p>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-semibold hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-slate-400 text-sm">menu_book</span>
                  Panduan Pengguna SIMRS
                </div>
                <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
              </button>
              <button className="w-full flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-semibold hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-slate-400 text-sm">lock_reset</span>
                  Atur Ulang Kata Sandi
                </div>
                <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer - Mini */}
        <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-50 dark:border-slate-700 text-center">
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Medinest IT Support v2.0</p>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
