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
  minutes = 0,
  percentCorrect = 0,
  scenes = 0,
  speed = 0,
  clicks = 0,
  mFactor = 0,
  pFactor = 0,
  sFactor = 0,
  tFactor = 0,
  kFactor = 0,
}: PointsCalculatorParams): number => {
  return (
    minutes * mFactor +
    percentCorrect * pFactor +
    scenes * sFactor +
    speed * tFactor +
    clicks * kFactor
  )
}
