export interface Memory {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: 'couple' | 'family' | 'pet' | 'special';
  date: string;
  created_at?: string;
}

export interface MemoryCardProps {
  memory: Memory;
  onDelete?: (id: string) => void;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}
