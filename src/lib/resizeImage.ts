const MAX_SIZE = 1600; // the longest side is at most 1600px
const QUALITY = 0.85; // JPEG at 85% quality

export async function resizeImage(file: File): Promise<File> {
    try {
        // 'from-image' keeps phone photos the right way up
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });

        const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height));
        const width = Math.round(bitmap.width * scale);
        const height = Math.round(bitmap.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return file;

        // White background, because JPEG has no transparency
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close();

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', QUALITY)
        );

        // If something failed, or the result isn't smaller, keep the original
        if (!blob || blob.size >= file.size) return file;

        return new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    } catch {
        return file;
    }
}