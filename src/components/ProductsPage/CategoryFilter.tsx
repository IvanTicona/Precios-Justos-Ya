import { Button, Card } from '@heroui/react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}: CategoryFilterProps) => (
  <Card>
    <div className="p-4">
      <h3 className="font-medium text-gray-900 mb-4">Categorías</h3>
      <div className="space-y-2">
        {categories.map(category => (
          <Button
            key={category}
            variant="ghost"
            className={`w-full justify-start ${activeCategory === category ? 'bg-indigo-50 text-indigo-600' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  </Card>
);