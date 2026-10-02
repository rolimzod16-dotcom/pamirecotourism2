'use client';
import { useEffect, useState } from 'react';
import { home } from '@/content/home';
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [inquiryVisible, setInquiryVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    const inquiry = document.getElementById('inquiry');
    const inquiryObserver = new IntersectionObserver(([entry]) => setInquiryVisible(entry.isIntersecting), { threshold: 0 });
    if (inquiry) inquiryObserver.observe(inquiry);
    return () => { observer.disconnect(); inquiryObserver.disconnect(); };
  }, []);
  return visible && !inquiryVisible ? <a href="#inquiry" className="fixed bottom-5 left-5 z-30 rounded-brand bg-gold px-5 py-4 text-sm font-bold text-navy shadow-soft sm:hidden">{home.hero.plan}</a> : null;
}
