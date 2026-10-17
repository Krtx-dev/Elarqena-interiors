import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import SelectedWork from "@/components/SelectedWork";
import ScrollingShowcase from "@/components/ScrollingShowcase";
import Materials from "@/components/Materials";
import Services from "@/components/Services";
import HorizontalLook from "@/components/HorizontalLook";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default async function Home() {
  const imagesDir = path.join(process.cwd(), "public/images");
  let scrapedImages: string[] = [];
  try {
    if (fs.existsSync(imagesDir)) {
      scrapedImages = fs.readdirSync(imagesDir).filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.webp'));
    }
  } catch (e) {
    console.error(e);
  }

  // Premium Unsplash images to elevate the design
  const premiumImages = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000", // 0 Hero
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200", // 1 Selected K
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", // 2 Selected W
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", // 3 Selected L
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200", // 4 Showcase 1
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=1200", // 5 Showcase 2
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", // 6 Showcase 3
    "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?auto=format&fit=crop&q=80&w=1200", // 7 Services 1
    "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1200", // 8 Services 2
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1200", // 9 Services 3
    "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=1200", // 10 Services 4
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200", // 11 Services 5
    "https://images.unsplash.com/photo-1600607687710-143dfa2f6460?auto=format&fit=crop&q=80&w=1200", // 12 Services 6
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", // 13 Services 7
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1200", // 14 Services 8
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200", // 15
  ];

  const galleryScraped = scrapedImages.slice(0, 40); // Pull up to 40 real images for the gallery
  
  const images = [...premiumImages, ...galleryScraped];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero images={images} />
      <Statement />
      <SelectedWork images={images} />
      <ScrollingShowcase images={images} />
      <Materials />
      <Services images={images} />
      <HorizontalLook images={images} />
      <Reviews />
      <Gallery images={images} />
      <Footer />
    </main>
  );
}
