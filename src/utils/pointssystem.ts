interface PointsCalculatorParams {
  minutes: number
  percentCorrect: number
  scenes: number
  speed: number
  clicks: number
  mFactor: number
  pFactor: number
  sFactor: number
  tFactor: number
  kFactor: number
}

export const calculatePoints = ({
  minutes,
  percentCorrect,
  scenes,
  speed,
  clicks,
  mFactor,
  pFactor,
  sFactor,
  tFactor,
  kFactor,
}: PointsCalculatorParams): number => {
  return (
    minutes * mFactor +
    percentCorrect * pFactor +
    scenes * sFactor +
    speed * tFactor +
    clicks * kFactor
  )
}
