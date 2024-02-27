import * as React from 'react'

const PodiumSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="podiumsvg"
    data-name="podiumsvg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1920 460"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      style={{ fill: '#55474b', strokeWidth: '0px' }}
      d="m1849.06,102.84v-26.14c0-3.25-2.63-5.89-5.88-5.89h-48.93v-27.84c0-3.25-2.63-5.89-5.89-5.89H124.37c-3.25,0-5.88,2.63-5.88,5.89v27.84h-48.93c-3.25,0-5.88,2.63-5.88,5.89v26.14H0v757.16h1920V102.84h-70.94Z" // Adjusted the path to make the bottom part go further down
    />
  </svg>
)
export default PodiumSVG
