import { Modal, Button } from '@heroui/react';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const MobileFilters = ({ 
  isOpen, 
  onClose, 
  categories, 
  activeCategory, 
  onSelectCategory 
}: MobileFiltersProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Filtrar por categoría"
  >
    <div className="space-y-2 p-4">
      {categories.map(category => (
        <Button
          key={category}
          variant="ghost"
          className={`w-full justify-start ${activeCategory === category ? 'bg-indigo-50 text-indigo-600' : ''}`}
          onClick={() => {
            onSelectCategory(category);
            onClose();
          }}
        >
          {category}
        </Button>
      ))}
    </div>
  </Modal>
);