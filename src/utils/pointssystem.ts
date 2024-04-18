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
    const potentialTFactor = safeTFactor - (safeSpeed - optimalSpeed) * penaltyRate
    // Ensure tFactor does not become negative
    safeTFactor = Math.max(0, potentialTFactor)
  } else {
    // Apply reward for speed lower than or equal to optimal
    safeTFactor += (optimalSpeed - safeSpeed) * rewardRate
  }

  console.log('safeMinutes', safeMinutes, 'safeMFacotr', safeMFactor, 'safePercentCorrect', safePercentCorrect, 'safePFactor', safePFactor, 'safeScenes', safeScenes, 'safeSFactor', safeSFactor, 'safeSpeed', safeSpeed, 'safeTFactor', safeTFactor, 'safeClicks', safeClicks, 'safeKFactor', safeKFactor
  )

  // Calculate points with dynamically adjusted tFactor
  return (
    safeMinutes * safeMFactor +
    safePercentCorrect * safePFactor +
    safeScenes * safeSFactor +
    safeSpeed * safeTFactor + // Use dynamically adjusted tFactor
    safeClicks * safeKFactor
  )
}

/*
Factor Parameters (mFactor, pFactor, sFactor, tFactor, kFactor):

mFactor (minuten factor): Dit is het gewicht dat aan de tijd (in minuten) wordt gegeven die besteed is aan een activiteit. Als je wilt dat de tijd zwaarder meetelt in de puntentelling, verhoog je deze factor.
pFactor (percentage juist factor): Dit geeft aan hoe belangrijk het percentage van correcte antwoorden of acties is. Een hogere pFactor betekent dat nauwkeurigheid belangrijker is voor de totaalscore.
sFactor (scènes factor): Dit gewicht is voor het aantal voltooide scènes of taken. Als het voltooien van meer taken of scènes meer punten moet opleveren, dan stel je deze factor hoger in.
tFactor (tijdssnelheid factor): Deze factor wordt aangepast op basis van de snelheid waarmee taken worden volbracht. Als taken sneller dan een optimale snelheid worden uitgevoerd, wordt deze factor verlaagd (penalty), en als taken langzamer worden uitgevoerd, wordt deze factor verhoogd (beloning).
kFactor (kliks factor): Dit bepaalt hoe belangrijk het aantal kliks (of interacties) is. Als je wilt dat elke klik of interactie zwaar weegt, zou je deze factor verhogen.
Hoe de argumenten gebruikt worden:

Wanneer de functie wordt aangeroepen, kun je waarden voor elk van de parameters meegeven, zoals hoeveel minuten iemand heeft besteed, het percentage correcte antwoorden, het aantal scènes dat is voltooid, de gemiddelde snelheid van reacties, en het aantal kliks.
De factoren die je instelt, vermenigvuldigen deze waarden om de totale punten te berekenen. Bijvoorbeeld, als iemand 30 minuten heeft besteed aan een taak en je hebt de mFactor ingesteld op 2, dan draagt die tijd 60 punten bij aan de totaalscore (30 minuten × 2).
Instellen van de factoren:
Voor het instellen van de factoren is het belangrijk om na te denken over wat je wilt belonen in de activiteit of het spel. Als precisie erg belangrijk is, verhoog dan de pFactor. Als je wilt dat gebruikers efficiënt zijn maar niet overhaast, dan moet je de tFactor zorgvuldig afstemmen en rekening houden met de optimale snelheid. Elk van deze factoren kan aangepast worden om de scoring af te stemmen op de gewenste uitkomsten.

Voor de snelheid van antwoorden moet er een optimale benchmark van reactie tijd ingesteld worden. Als iemand sneller reageert dan deze waarde
verident hij iets meer punten, is hij langzamer dan krijgt hij minder punten of zelfs geen punten voor de reactietijd.++
*/
