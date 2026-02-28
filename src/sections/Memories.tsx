import { useEffect, useState } from 'react';
import { Heart, Calendar, Users, PawPrint, Sparkles, Trash2 } from 'lucide-react';
import { getMemories, deleteMemory, type Memory } from '@/lib/supabase';
import { toast } from 'sonner';

const categoryIcons = {
  couple: Heart,
  family: Users,
  pet: PawPrint,
  special: Sparkles,
};

const categoryColors = {
  couple: 'text-rose-500 bg-rose-50',
  family: 'text-blue-500 bg-blue-50',
  pet: 'text-amber-500 bg-amber-50',
  special: 'text-purple-500 bg-purple-50',
};

const categoryLabels = {
  couple: 'Casal',
  family: 'Família',
  pet: 'Pets',
  special: 'Especiais',
};

// Static memories using the provided images
const staticMemories: Memory[] = [
  {
    id: '1',
    title: 'Nosso Amor',
    description: 'Momentos especiais a dois, cheios de carinho e cumplicidade. Cada instante ao seu lado é único.',
    image_url: '/images/heart-memories.jpg',
    category: 'couple',
    date: '2024-02-14',
  },
  {
    id: '2',
    title: 'Momentos em Família',
    description: 'A família é onde a vida começa e o amor nunca termina. Momentos de alegria e união.',
    image_url: '/images/family-moments.jpg',
    category: 'family',
    date: '2024-01-20',
  },
  {
    id: '3',
    title: 'Nossos Pets',
    description: 'Os peludos da casa que trazem tanta alegria e amor incondicional para nossas vidas.',
    image_url: '/images/pet-moments.jpg',
    category: 'pet',
    date: '2024-03-01',
  },
  {
    id: '4',
    title: 'Datas Especiais',
    description: 'Aniversários, comemorações e todos aqueles dias que marcam nossa história juntos.',
    image_url: '/images/calendar-memories.jpg',
    category: 'special',
    date: '2024-02-28',
  },
];

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>(staticMemories);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMemories();
  }, []);

  async function loadMemories() {
    try {
      // Try to fetch from Supabase if configured
      if (import.meta.env.VITE_SUPABASE_URL) {
        const data = await getMemories();
        if (data && data.length > 0) {
          setMemories([...staticMemories, ...data]);
        }
      }
    } catch (error) {
      console.log('Using static memories only');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        await deleteMemory(id);
      }
      setMemories(memories.filter(m => m.id !== id));
      toast.success('Memória removida com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover memória');
    }
  }

  const filteredMemories = selectedCategory === 'all' 
    ? memories 
    : memories.filter(m => m.category === selectedCategory);

  if (loading) {
    return (
      <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Carregando memórias...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Nossas <span className="text-rose-500">Memórias</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada foto conta uma história, cada momento é um tesouro guardado no coração.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todas
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => {
            const Icon = categoryIcons[key as keyof typeof categoryIcons];
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredMemories.map((memory) => {
            const Icon = categoryIcons[memory.category];
            return (
              <div
                key={memory.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={memory.image_url}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${categoryColors[memory.category]}`}>
                      <Icon className="w-4 h-4" />
                      {categoryLabels[memory.category]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(memory.date).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                    {memory.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {memory.description}
                  </p>

                  {/* Delete button (only for dynamic memories) */}
                  {!staticMemories.find(m => m.id === memory.id) && (
                    <button
                      onClick={() => handleDelete(memory.id)}
                      className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remover
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
