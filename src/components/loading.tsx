import { cn } from '~/lib/utils'
import { Skeleton } from '~/components/ui/skeleton'

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const LoadingSpinner = ({ size = 80, className, ...props }: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-spin', className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export const LoadingPage = () => {
  return (
    <div className="relative right-0 top-0 flex h-screen w-screen items-center justify-center">
      <LoadingSpinner size={60} />
    </div>
  )
}

export const LevelsSkeletonList = () => {
  return (
    <div className="flex size-full flex-col">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex size-full flex-col">
          <div className="flex size-full items-center rounded-none">
            <Skeleton className="h-20 w-full rounded-none border-t-4 border-gray-400">
              <div className="flex size-full items-center justify-center">
                <div className="flex size-full justify-start space-x-4">
                  <div className="relative flex px-4 h-full w-full items-center justify-start gap-x-24 text-center text-2xl font-medium">
                    <div className="flex flex-col justify-center relative size-14">
                      <Skeleton className="rounded-full bg-primary/80 size-full" />
                    </div>
                    <Skeleton className="text-xl rounded-full bg-primary/80 size-1/2" />
                  </div>
                </div>
              </div>
            </Skeleton>
            {/* Skeleton for the text and button area */}
          </div>
        </div>
      ))}
    </div>
  )
}

