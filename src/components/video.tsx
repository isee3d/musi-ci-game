export function Video() {
  return (
    <video className="h-full w-full" width="1920" height="1080" controls playsInline>
      <source src="/media/sample-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
