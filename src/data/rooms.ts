export type Room = {
    id: number;
    slug: string;
    name: string;
};

export const rooms: Room[] = [
    { id: 1, slug: 'living-room', name: 'Living room' },
    { id: 2, slug: 'bedroom', name: 'Bedroom' },
    { id: 3, slug: 'office', name: 'Office' },
    { id: 4, slug: 'hallway', name: 'Hallway' },
    { id: 5, slug: 'kitchen', name: 'Kitchen' },
    { id: 6, slug: 'bathroom', name: 'Bathroom' },
    { id: 7, slug: 'outdoor', name: 'Outdoor' },
];