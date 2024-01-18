export function formatTime(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    if (hours === 0) {
        return `${minutes} min en ${seconds} seconden`;
    }

    return `${hours}uur ${minutes}min en ${seconds}seconden`;
}
