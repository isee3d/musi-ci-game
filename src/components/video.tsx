export function Video() {
  return (
    <video
      width="1920"
      height="1080"
      controls
      autoPlay
      loop
      muted
    >
      <source src="/media/sample-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
