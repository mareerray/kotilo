import { forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type SoundToggleProps = {
    isPlaying: boolean;
    onToggle: () => void;
};

const SoundToggle = forwardRef<HTMLButtonElement, SoundToggleProps>(
    function SoundToggle({ isPlaying, onToggle }, ref) {
        return (
            <button
                ref={ref}
                type="button"
                className="sound-toggle"
                onClick={onToggle}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
                aria-pressed={isPlaying}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        );
    }
);

export default SoundToggle;