import * as React from 'react';
import { motion } from 'framer-motion';

function Arrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={65} height={45} {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeMiterlimit={10}
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, staggerDirection: -1, delay: 0.5 }}
          d="M9.358 37.549c-.399-2.15-.301-4.137.191-5.941.491-1.807 1.378-3.432 2.555-4.861 1.176-1.432 2.642-2.665 4.293-3.688 1.652-1.023 3.49-1.838 5.409-2.426a25.31 25.31 0 013.471-.803 21.716 21.716 0 013.583-.267c1.196.014 2.387.136 3.548.391 1.16.254 2.291.638 3.367 1.172.66.328 1.436.827 2.184 1.44.746.613 1.465 1.342 2.004 2.129s.902 1.633.939 2.479-.25 1.694-1.012 2.488a3.388 3.388 0 01-2.074 1.026c-.771.099-1.598-.021-2.416-.268-.818-.246-1.627-.623-2.36-1.041a14.311 14.311 0 01-1.9-1.301 17.409 17.409 0 01-2.304-2.279 18.003 18.003 0 01-1.871-2.699c-.54-.957-.99-1.963-1.331-2.998a14.77 14.77 0 01-.681-3.167 12.406 12.406 0 01.137-3.509 11 11 0 011.09-3.141c3.246-6.142 10.959-7.36 17.227-7.643 3.102-.139 6.207-.198 9.311-.239 3.193-.045 6.385.058 9.568.309"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          strokeLinejoin="round"
          d="M2.716 33.124c3.721 2.325 4.349 6.603 7.402 9.481 1.046-3.027 3.443-9.07 6.125-11.113"
        />
      </g>
    </svg>
  );
}

export default Arrow;
