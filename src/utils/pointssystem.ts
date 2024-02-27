interface PointsCalculatorParams {
  minutes?: number | null
  percentCorrect?: number | null
  scenes?: number | null
  speed?: number | null // Average latency
  clicks?: number | null
  mFactor?: number | null
  pFactor?: number | null
  sFactor?: number | null
  tFactor?: number | null // Factor for speed penalty or reward
  kFactor?: number | null
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
  // Default to 0 if the value is null or undefined
  const safeMinutes = minutes ?? 0
  const safePercentCorrect = percentCorrect ?? 0
  const safeScenes = scenes ?? 0
  const safeSpeed = speed ?? 0
  const safeClicks = clicks ?? 0
  const safeMFactor = mFactor ?? 0
  const safePFactor = pFactor ?? 0
  const safeSFactor = sFactor ?? 0
  let safeTFactor = tFactor ?? 0 // Let, because it might be modified
  const safeKFactor = kFactor ?? 0

  // Define an optimal speed value
  const optimalSpeed = 10
  const penaltyRate = 0.1 // Adjust this rate as needed
  const rewardRate = 0.1 // Adjust this rate as needed

  // Dynamically adjust tFactor based on the deviation from optimalSpeed
  if (safeSpeed > optimalSpeed) {
    // Apply penalty for speed higher than optimal
    safeTFactor -= (safeSpeed - optimalSpeed) * penaltyRate
  } else {
    // Apply reward for speed lower than or equal to optimal
    safeTFactor += (optimalSpeed - safeSpeed) * rewardRate
  }

  // Calculate points with dynamically adjusted tFactor
  return (
    safeMinutes * safeMFactor +
    safePercentCorrect * safePFactor +
    safeScenes * safeSFactor +
    safeSpeed * safeTFactor + // Use dynamically adjusted tFactor
    safeClicks * safeKFactor
  )
}
