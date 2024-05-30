import Decimal from 'decimal.js'

interface PointsCalculatorParams {
  minutes?: number | null
  percentCorrect?: number | null
  scenes?: number | null
  speed?: number | null // Average latency
  clicks?: number | null
  mFactor?: Decimal | null
  pFactor?: Decimal | null
  sFactor?: Decimal | null
  tFactor?: Decimal | null // Factor for speed penalty or reward
  kFactor?: Decimal | null
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
  const safeMinutes = new Decimal(minutes ?? 0)
  const safePercentCorrect = new Decimal(percentCorrect ?? 0)
  const safeScenes = new Decimal(scenes ?? 0)
  const safeSpeed = new Decimal(speed ?? 0)
  const safeClicks = new Decimal(clicks ?? 0)
  const safeMFactor = mFactor ?? new Decimal(0)
  const safePFactor = pFactor ?? new Decimal(0)
  const safeSFactor = sFactor ?? new Decimal(0)
  let safeTFactor = tFactor ?? new Decimal(0)
  const safeKFactor = kFactor ?? new Decimal(0)

  // Define an optimal speed value
  const optimalSpeed = new Decimal(1500)
  const penaltyRate = new Decimal(0.1)
  const rewardRate = new Decimal(0.5)

  if(tFactor !== null && !tFactor?.eq(0)) {
    // Dynamically adjust tFactor based on the deviation from optimalSpeed
    if (safeSpeed.gt(optimalSpeed)) {
      // Subtract penalty
      safeTFactor = Decimal.max(
        new Decimal(0),
        safeTFactor.sub(safeSpeed.sub(optimalSpeed).mul(penaltyRate)),
      )
    } else {
      // Add reward
      safeTFactor = safeTFactor.add(optimalSpeed.sub(safeSpeed).mul(rewardRate))
    }
  }

  console.log(
    'safeMinutes',
    safeMinutes,
    'safeMFacotr',
    safeMFactor,
    'safePercentCorrect',
    safePercentCorrect,
    'safePFactor',
    safePFactor,
    'safeScenes',
    safeScenes,
    'safeSFactor',
    safeSFactor,
    'safeSpeed',
    safeSpeed,
    'safeTFactor',
    safeTFactor,
    'safeClicks',
    safeClicks,
    'safeKFactor',
    safeKFactor,
  )

  const totalPoints = Decimal.sum(
    safeMinutes.mul(safeMFactor),
    safePercentCorrect.mul(safePFactor),
    safeScenes.mul(safeSFactor),
    safeSpeed.mul(safeTFactor),
    safeClicks.mul(safeKFactor),
  )

  return totalPoints.isNegative() ? 0 : totalPoints.toNumber()
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
