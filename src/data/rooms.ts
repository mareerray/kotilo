export type Room = {
    id: string;
    name: string;
};

export const rooms = [
    { id: 1, name: 'Living room' },
    { id: 2, name: 'Bedroom' },
    { id: 3, name: 'Office' },
    { id: 4, name: 'Hallway' },
    { id: 5, name: 'Kitchen' },
    { id: 6, name: 'Bathroom' },
    { id: 7, name: 'Outdoor' },
] as const;