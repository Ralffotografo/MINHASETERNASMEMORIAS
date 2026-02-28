import { useState } from 'react';
import { Plus, Upload, Heart, Users, PawPrint, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import type { Memory } from '@/lib/supabase';

const categories = [
  { id: 'couple', label: 'Casal', icon: Heart },
  { id: 'family', label: 'Família', icon: Users },
  { id: 'pet', label: 'Pets', icon: PawPrint },
  { id: 'special', label: 'Especiais', icon: Sparkles },
];

export default function AddMemory() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: Memory['category'];
    date: string;
    image_url: string;
  }>({
    title: '',
    description: '',
    category: 'couple',
    date: new Date().toISOString().split('T')[0],
    image_url: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL) {
        toast.info('Supabase não configurado. Configure as variáveis de ambiente para salvar memórias.');
        return;
      }

      const { addMemory } = await import('@/lib/supabase');
      await addMemory(formData);
      
      toast.success('Memória adicionada com sucesso!');
      setFormData({
        title: '',
        description: '',
        category: 'couple',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
      });
    } catch (error) {
      toast.error('Erro ao adicionar memória. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="add-memory" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
            <Plus className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Adicionar <span className="text-rose-500">Memória</span>
          </h2>
          <p className="text-lg text-gray-600">
            Guarde um novo momento especial para sempre.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                placeholder="Ex: Nosso primeiro encontro"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id as Memory['category'] })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        formData.category === cat.id
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Data *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                URL da Imagem
              </label>
              <div className="relative">
                <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  id="image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Deixe em branco para usar uma imagem padrão.
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                placeholder="Conte um pouco sobre esse momento especial..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Adicionar Memória
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">Configuração do Supabase</h3>
          <p className="text-blue-700 text-sm mb-4">
            Para salvar memórias no banco de dados, configure as variáveis de ambiente no Vercel:
          </p>
          <ul className="text-sm text-blue-700 space-y-1 font-mono">
            <li>VITE_SUPABASE_URL=https://seu-projeto.supabase.co</li>
            <li>VITE_SUPABASE_ANON_KEY=sua-chave-anon</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
