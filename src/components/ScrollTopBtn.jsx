import './ScrollTopBtn.css'

import React from 'react'
import { useEffect, useState } from 'react'

const ScrollTopBtn = ({ scrollReference }) => {
  const [showBtn, setShowBtn] = useState(false);

  const scrollTop = (steps, time) => {
    let windowLocation = window.pageYOffset;
    const step = windowLocation / steps;
    const stepTime = (time / steps) * 1000;
    let currentStep = 1;
    const interval = setInterval(() => {
      if (currentStep == steps) {
        windowLocation = 0;
        clearInterval(interval);
      } else {
        windowLocation -= step;
      }
      window.scroll(0, windowLocation);
      currentStep++;
    }, stepTime);
  }

  useEffect(() => {
    if (!scrollReference) return;
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowBtn(false);
        } else {
          setShowBtn(true);
        }
      });
    }, { threshold: 0.1 }).observe(scrollReference.current);
  }, []);

  return (
    <button id='scroll-top-btn' className={showBtn ? 'show' : ''} onClick={() => { scrollTop(25, 0.5) }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
      </svg>
    </button>
  )
}

export default ScrollTopBtn