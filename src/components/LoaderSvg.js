import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const LoaderContainer = styled(motion.div)`
  background-color: var(--bg);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: grid;
  place-items: center;
`

const textVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.2 },
  },
}
function Loader({ setIsLoading }) {
  const completed = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  return (
    <LoaderContainer
      exit={{ opacity: 0, scale: 0, duration: 0.2 }}
      key="loading"
    >
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        width="185"
        height="186"
        viewBox="0 0 185 186"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="jj_logo">
          <g id="Group">
            <motion.path
              variants={textVariant}
              initial="hidden"
              animate="visible"
              transform="translate(10, 0)"
              id="lt"
              d="M58.3662 92.4336L69.124 102.189L63.877 108.043L47.6084 92.75L63.5078 76.2178L69.1768 81.5703L58.3662 92.4336Z"
              fill="#21E6C1"
            />
            <motion.path
              variants={textVariant}
              initial="hidden"
              animate="visible"
              transform="translate(10, 0)"
              onAnimationComplete={completed}
              id="J"
              d="M 89.9932 97.0107 C 89.9932 98.9476 89.627 100.771 88.8945 102.479 C 88.1621 104.172 87.1611 105.653 85.8916 106.923 C 84.6383 108.176 83.1572 109.169 81.4482 109.901 C 79.7555 110.634 77.9408 111 76.0039 111 C 74.832 111 73.6602 110.854 72.4883 110.561 V 103.041 C 73.0091 103.35 73.5706 103.586 74.1729 103.749 C 74.7751 103.912 75.3854 103.993 76.0039 103.993 C 76.9642 103.993 77.8675 103.814 78.7139 103.456 C 79.5765 103.082 80.3252 102.577 80.96 101.942 C 81.5947 101.308 82.0911 100.567 82.4492 99.7207 C 82.8236 98.8743 83.0107 97.971 83.0107 97.0107 V 75.9902 H 89.9932 V 97.0107"
              // d="M89.9932 97.0107C89.9932 98.9476 89.627 100.771 88.8945 102.479C88.1621 104.172 87.1611 105.653 85.8916 106.923C84.6383 108.176 83.1572 109.169 81.4482 109.901C79.7555 110.634 77.9408 111 76.0039 111C74.832 111 73.6602 110.854 72.4883 110.561V103.041C73.0091 103.35 73.5706 103.586 74.1729 103.749C74.7751 103.912 75.3854 103.993 76.0039 103.993C76.9642 103.993 77.8675 103.814 78.7139 103.456C79.5765 103.082 80.3252 102.577 80.96 101.942C81.5947 101.308 82.0911 100.567 82.4492 99.7207C82.8236 98.8743 83.0107 97.971 83.0107 97.0107V75.9902H89.9932V97.0107ZM109.915 97.0107C109.915 98.9476 109.549 100.771 108.816 102.479C108.084 104.172 107.083 105.653 105.813 106.923C104.56 108.176 103.079 109.169 101.37 109.901C99.6774 110.634 97.8626 111 95.9258 111C94.7539 111 93.582 110.854 92.4102 110.561V103.041C92.931 103.35 93.4925 103.586 94.0947 103.749C94.6969 103.912 95.3073 103.993 95.9258 103.993C96.8861 103.993 97.7894 103.814 98.6357 103.456C99.4984 103.082 100.247 102.577 100.882 101.942C101.517 101.308 102.013 100.567 102.371 99.7207C102.745 98.8743 102.933 97.971 102.933 97.0107V75.9902H109.915V97.0107Z"
              fill="#21E6C1"
            />
            <motion.path
              variants={textVariant}
              initial="hidden"
              animate="visible"
              transform="translate(-10, 0)"
              id="gt"
              d="M126.634 91.5664L115.876 81.8105L121.123 75.957L137.392 91.25L121.492 107.782L115.823 102.43L126.634 91.5664Z"
              fill="#21E6C1"
            />
            <motion.path
              stroke-width="8"
              initial={{ pathLength: 0, strokeWidth: 4 }}
              animate={{
                pathLength: 1,
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
              }}
              id="hexagon"
              d="M93.6466 9.88738C92.7211 9.3386 91.5725 9.32753 90.6365 9.85835L21.52 49.0579C20.5805 49.5907 20 50.5874 20 51.6674V131.911C20 132.97 20.5587 133.951 21.4699 134.492L90.6534 175.513C91.5789 176.061 92.7275 176.072 93.6634 175.542L162.78 136.342C163.719 135.809 164.3 134.813 164.3 133.733V53.4889C164.3 52.4295 163.741 51.4487 162.83 50.9084L93.6466 9.88738Z"
              stroke="#21E6C1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </motion.svg>
    </LoaderContainer>
  )
}

export default Loader
