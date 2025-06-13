import FloatActions from "@/components/FloatActions";
import FullscreenImageOverlay from "@/components/FullscreenImageOverlay";
import ImageGallery from "@/components/ImageGallery";
import { FullscreenProvider } from "@/contexts/FullscreenContext";

export default function Home() {
  return (
    <FullscreenProvider>
      <ImageGallery />
      <FloatActions />
      <FullscreenImageOverlay />
    </FullscreenProvider>
  );
}
