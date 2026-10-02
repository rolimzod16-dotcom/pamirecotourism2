import { MessageCircle } from 'lucide-react';
export function WhatsAppButton() {
  return <a href="https://wa.me/992936001936" target="_blank" rel="noopener noreferrer" aria-label="Chat with Pamir Ecotourism on WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-turquoise text-navy shadow-soft transition-transform hover:scale-105 sm:bottom-7 sm:right-7"><MessageCircle size={27} aria-hidden="true" /></a>;
}
