export type Annotation = {
    id: string;
    x1: number;     // start point, percent from left
    y1: number;     // start point, percent from top
    x2: number;     // end point, percent from left
    y2: number;     // end point, percent from top
    label: string;  // "Width"
    value: string;  // "45 cm"
};