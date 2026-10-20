import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Annotation } from '../types/annotation';

type Point = { x: number; y: number };

type PhotoAnnotatorProps = {
    annotations: Annotation[];
    onChange: (next: Annotation[]) => void;
    children: ReactNode;
};

function PhotoAnnotator({ annotations, onChange, children }: PhotoAnnotatorProps) {
    const [start, setStart] = useState<Point | null>(null);
    const [end, setEnd] = useState<Point | null>(null);
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (end) return; // both points chosen, waiting for the form
        const rect = e.currentTarget.getBoundingClientRect();
        const point = {
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        };
        if (!start) setStart(point);
        else setEnd(point);
    }

    function reset() {
        setStart(null);
        setEnd(null);
        setLabel('');
        setValue('');
    }

    function save() {
        if (!start || !end || !label.trim()) return;
        onChange([
            ...annotations,
            {
                id: crypto.randomUUID(),
                x1: start.x, y1: start.y,
                x2: end.x, y2: end.y,
                label: label.trim(),
                value: value.trim(),
            },
        ]);
        reset();
    }

    function remove(id: string) {
        onChange(annotations.filter((a) => a.id !== id));
    }

    return (
        <div>
            <div className="annotator" onClick={handleClick}>
                {children}

                <svg className="annotator__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {annotations.map((a) => (
                        <line key={a.id} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} className="line" />
                    ))}
                    {start && end && (
                        <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} className="line line--draft" />
                    )}
                </svg>

                {annotations.map((a) => (
                    <div key={a.id}>
                        <span className="dot" style={{ left: `${a.x1}%`, top: `${a.y1}%` }} />
                        <span className="dot" style={{ left: `${a.x2}%`, top: `${a.y2}%` }} />
                        <button
                            type="button"
                            className="line-label"
                            style={{ left: `${(a.x1 + a.x2) / 2}%`, top: `${(a.y1 + a.y2) / 2}%` }}
                            title="Tap to remove"
                            onClick={(e) => {
                                e.stopPropagation();
                                remove(a.id);
                            }}
                        >
                            {a.label} {a.value}
                        </button>
                    </div>
                ))}

                {start && <span className="dot dot--draft" style={{ left: `${start.x}%`, top: `${start.y}%` }} />}
                {end && <span className="dot dot--draft" style={{ left: `${end.x}%`, top: `${end.y}%` }} />}
            </div>

            {start && !end && <p className="field-note">Now tap the second point.</p>}
            {!start && <p className="field-note">Tap the photo to place the first point.</p>}

            {start && end && (
                <div className="annotation-form">
                    <input placeholder="Label (Width)" value={label} onChange={(e) => setLabel(e.target.value)} />
                    <input placeholder="Value (45 cm)" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button type="button" onClick={save}>Add</button>
                    <button type="button" onClick={reset}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default PhotoAnnotator;