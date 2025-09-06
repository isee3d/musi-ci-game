import React, { useEffect, useRef, useState } from 'react'
import {
  testLevelCorrespondingArrayName,
  testLevelCorrespondingIndex,
} from '~/components/gameModes/testMode/test'
import {
  test_1,
  test_2,
  test_3,
  test_4,
  TestScene,
} from '~/components/gameModes/testMode/testJsonData'
import { Progress } from '~/components/ui/progress'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'
import { api } from '~/utils/api'

interface TestProgressBarProps {
  sublevelId: string
}

const TestProgressBar: React.FC<TestProgressBarProps> = ({ sublevelId }) => {
  const store = useLuisterenStore()
  const { data: sublevel } = api.sublevel.getSublevelById.useQuery({ id: sublevelId })
  const testArrayRef = useRef([test_1.length, test_2.length, test_3.length, test_4.length])

  const progressValue = () => {
    if (sublevel?.name) {
      const testArrayName = testLevelCorrespondingArrayName[sublevel.name]
      if (!testArrayName) throw new Error(`no corresponding array name ${sublevel.name}`)

      const testArrayIndex = testLevelCorrespondingIndex[sublevel.name]
      if (!testArrayIndex) throw new Error(`no corresponding array index ${sublevel.name}`)

      const testArray = (store as any)[testArrayName] as unknown as TestScene[]
      if (!testArray) throw new Error(`no corresponding array ${sublevel.name}`, store)

      if (testArray.length === 0) {
        return 100
      } else {
        return (1 - testArray.length / testArrayRef.current[testArrayIndex - 1]!) * 100
      }
    }
    // if (sublevel?.name === 'TEST, level 1') {
    //   if (Test1Array?.length! === 0) {
    //     return 100
    //   }

    //   return (1 - Test1Array?.length! / TestOneArrayLengthRef.current) * 100
    // }
    // if (sublevel?.name === 'TEST, level 2') {
    //   if (Test2Array?.length! === 0) {
    //     return 100
    //   }

    //   return (1 - Test2Array?.length! / TestTwoArrayLengthRef.current) * 100
    // }
  }
  console.log({ progress: progressValue() })
  return (
    <div className="w-full px-8">
      <Progress indicatorColor={'#A020F0'} value={progressValue()} />
    </div>
  )
}

export default TestProgressBar
