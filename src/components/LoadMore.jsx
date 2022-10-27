import './LoadMore.css'

import React from 'react'
import { useState, useEffect, useRef } from 'react'

import Loading from '../img/loading.svg'

const LoadMore = ({ callback, lastPage }) => {
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef();

  useEffect(() => {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setLoading(true);
          callback();
        } else {
          setLoading(false);
        }
      });
    }, { threshold: 0.8 }).observe(loadMoreRef.current);
  }, []);

  return (
    <div className='flex-row flex-jc mt-2 mb-2'>
      <div className='load-more flex-row flex-jc flex-ac' ref={loadMoreRef}>
        {!lastPage ?
          (loading ?
            <img src={Loading} alt='Loading' />
            : <p>Load More</p>)
          : <p>End Page</p>
        }
      </div>
    </div>
  )
}

export default LoadMore