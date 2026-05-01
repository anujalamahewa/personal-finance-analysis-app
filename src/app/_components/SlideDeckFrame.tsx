import { getSlideDoc } from "../_lib/slide-doc";

type SlideDeckFrameProps = {
  startSlide?: number;
  title?: string;
};

export default function SlideDeckFrame({
  startSlide = 0,
  title = "Personal Financial Analysis",
}: SlideDeckFrameProps) {
  const htmlDoc = getSlideDoc(startSlide);

  return (
    <main style={{ width: "100vw", height: "100dvh", overflow: "hidden" }}>
      <iframe
        srcDoc={htmlDoc}
        title={title}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </main>
  );
}
