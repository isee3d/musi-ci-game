import React, { Suspense, use, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FragmentWithNotes } from '~/components/fragmentPlayer/audio/fragmentWithNotes'
import { getNotesPositions } from '~/components/fragmentPlayer/fragmentPlayerUtils'
import { Ortho, View } from '~/components/3D/canvas/View'
import { FragmentCircle, FragmentLine } from '~/components/3D/canvas/Examples'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

function getAnimationClass(
  options: AnimationPlayerOptions | undefined,
  thisFragment: FragmentWithNotes,
  isBlueBorder: boolean,
) {
  const borderColorClass = options?.showCorrectOutline
    ? options?.isCorrect
      ? 'border-green-500'
      : 'border-red-500'
    : ''

  const blueBorderClass = isBlueBorder ? 'border-blue-500' : ''

  const bgColorClass =
    options?.showCorrectOutline && thisFragment.id === options?.guessedFragment?.id
      ? options?.isCorrect
        ? 'bg-green-500'
        : 'bg-red-500'
      : 'bg-zinc-200'

  const cursorClass = options?.isClickable
    ? 'cursor-pointer hover:opacity-60'
    : 'cursor-not-allowed bg-gray-400'

  return cn(
    'rounded-2xl border-4 border-transparant shadow-md w-5/6 md:w-1/2',
    borderColorClass,
    blueBorderClass,
    bgColorClass,
    cursorClass,
  )
}

function findMinMaxX(pointsArray: NotePositionTime[]): [number, number] {
  let minX = Infinity
  let maxX = -Infinity

  for (const points of pointsArray) {
    for (const point of points.position) {
      minX = Math.min(minX, point.x)
      maxX = Math.max(maxX, point.x)
    }
  }

  return [minX, maxX]
}

interface AnimationPlayerOptions {
  isClickable?: boolean
  isLooping?: boolean
  isAnimating: boolean
  showCorrectOutline?: boolean
  guessedFragment?: FragmentWithNotes
  isCorrect?: boolean
  useBlueBorderCLick? : boolean
  onAnimationClicked?: (fragment: FragmentWithNotes) => void
  onAnimationComplete?: (fragment?: FragmentWithNotes) => void
}

interface AnimationPlayerProps {
  animationFragment: FragmentWithNotes
  options?: AnimationPlayerOptions
}

export interface NotePositionTime {
  position: THREE.Vector3[]
  time: number
}

const AnimationPlayer: React.FC<AnimationPlayerProps> = ({ animationFragment, options }) => {
  const [positionZeroPoint, setPositionZeroPoint] = useState<number>(0)
  const [notePositions, setNotePositions] = useState<NotePositionTime[]>([])
  const containerRef = useRef<HTMLButtonElement>(null)
  const [fragmentPlayerSettings, setFragmentPlayerSettings] = useState({
    lineColor: 'black',
    circleColor: 'red',
  })

  const [isBlueBorder, setIsBlueBorder] = useState(false)

  const appSettingsQuery = api.appSettings.getAllSettings.useQuery(undefined, {
    onSuccess: (data) => {
      setFragmentPlayerSettings({
        lineColor: data?.fragmentDotLineColor ?? 'black',
        circleColor: data?.fragmentDotColor ?? 'red',
      })
    },
  })

  useEffect(() => {
    if (containerRef.current) {
      resizeWindow()
      window.addEventListener('resize', resizeWindow)
    }
    return () => {
      window.removeEventListener('resize', resizeWindow)
    }
  }, [])

  useEffect(() => {
    resizeWindow()
  }, [animationFragment, options])

  function resizeWindow(): void {
    if (containerRef.current) {
      const notePositions = getNotesPositions(
        animationFragment.notes,
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
        8,
      )

      setNotePositions((latestNotePositions) => {
        const minMax = findMinMaxX(latestNotePositions)
        setPositionZeroPoint(((minMax[1] - minMax[0]) / 2) * -1)
        return notePositions
      })
    }
  }

  function handleAnimationClicked() {
    if(options?.useBlueBorderCLick) {
      setIsBlueBorder(true)
      setTimeout(() => setIsBlueBorder(false), 1000)
    }

    if (options?.onAnimationClicked) {
      options.onAnimationClicked(animationFragment)
    }
  }

  function handleAnimationComplete() {
    if (options?.onAnimationComplete) {
      options.onAnimationComplete(animationFragment)
    }
  }

  return (
    <button
      disabled={!options?.isAnimating && !options?.isClickable}
      onClick={handleAnimationClicked}
      ref={containerRef}
      className={`${getAnimationClass(options, animationFragment, isBlueBorder)}`}
    >
      <View useOrbit className="h-28 w-full">
        <Suspense fallback={null}>
          {notePositions.map((points, index) => (
            <FragmentLine
              key={index}
              position={new THREE.Vector3(positionZeroPoint, 0, 0)}
              lineWidth={7}
              color={fragmentPlayerSettings.lineColor}
              points={points.position}
            />
          ))}
          <FragmentCircle
            pointsList={notePositions}
            segments={32}
            xCorrection={positionZeroPoint}
            radius={10}
            color={fragmentPlayerSettings.circleColor}
            onComplete={handleAnimationComplete}
            isAnimating={options?.isAnimating}
            loop={options?.isLooping}
          />
          <Ortho />
        </Suspense>
      </View>
    </button>
  )
}

export default AnimationPlayer
