import React, { useEffect, useRef, useState } from 'react'
import { Progress } from '~/components/ui/progress'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

interface TestProgressBarProps {
  sublevelId: string
}

const TestProgressBar: React.FC<TestProgressBarProps> = ({ sublevelId }) => {
  const { TestOneArray, TestTwoArray } = useLuisterenStore()
  const { data: sublevel } = api.sublevel.getSublevelById.useQuery({ id: sublevelId })

  const TestOneArrayLengthRef = useRef(TestOneArray?.length ?? 0)
  const TestTwoArrayLengthRef = useRef(TestTwoArray?.length ?? 0)

  if (TestOneArray?.length === 0 && sublevel?.name === 'TEST, level 1') return null
  if (TestTwoArray?.length === 0 && sublevel?.name === 'TEST, level 2') return null

  const progressValue = () => {
    if (sublevel?.name === 'TEST, level 1') {
      if (TestOneArray?.length! === 0) {
        return 100
      }

      return (1 - TestOneArray?.length! / TestOneArrayLengthRef.current) * 100
    }
    if (sublevel?.name === 'TEST, level 2') {
      if (TestTwoArray?.length! === 0) {
        return 100
      }
      
      return (1 - TestTwoArray?.length! / TestTwoArrayLengthRef.current) * 100
    }
  }

  return (
    <div className="w-full px-8">
      <Progress indicatorColor={'#A020F0'} value={progressValue()} />
    </div>
  )
}

export default TestProgressBar
