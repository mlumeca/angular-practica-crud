export function formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString();
    // transform('YYYY-MM-DDTHH:MM:SS.mmmZ');
}
