import type { Annotation } from "./annotation";

export type Item = {
    id: number;
    name: string;
    description: string;
    category: string;
    color: string;
    width_cm: number | null;
    height_cm: number | null;
    depth_cm: number | null;
    photo_path: string | null;
    condition: string;
    price: number | null;
    annotations: Annotation[];
};
