import {
    Sofa, BedDouble, NotebookPen, DoorOpen,
    CookingPot, Bath, Sprout,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const roomIcons: Record<string, LucideIcon> = {
    'Living room': Sofa,
    'Bedroom': BedDouble,
    'Office': NotebookPen,
    'Hallway': DoorOpen,
    'Kitchen': CookingPot,
    'Bathroom': Bath,
    'Outdoor': Sprout,
};