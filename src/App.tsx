import { Toaster } from '@/components/ui/sonner';
import Hero from '@/sections/Hero';
import Memories from '@/sections/Memories';
import AddMemory from '@/sections/AddMemory';
import Footer from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Hero />
      <Memories />
      <AddMemory />
      <Footer />
    </div>
  );
}

export default App;
