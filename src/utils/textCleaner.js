/**
 * Cleans text by removing HTML tags, markdown formatting, and special characters.
 * Returns plain text suitable for display.
 * 
 * @param {string} text - The text to clean
 * @returns {string} - The cleaned plain text
 */
const cleanText = (text) => {
    if (!text || typeof text !== 'string') {
        return '';
    }

    let cleanedText = text;

    // Remove HTML tags
    cleanedText = cleanedText.replace(/<[^>]+>/g, '');

    // Remove markdown formatting
    // Bold: **text** or __text__ (using non-greedy matching)
    cleanedText = cleanedText.replace(/\*\*(.+?)\*\*/g, '$1');
    cleanedText = cleanedText.replace(/__(.+?)__/g, '$1');
    
    // Italic: *text* or _text_ (using non-greedy matching)
    cleanedText = cleanedText.replace(/\*(.+?)\*/g, '$1');
    cleanedText = cleanedText.replace(/_(.+?)_/g, '$1');
    
    // Strikethrough: ~~text~~
    cleanedText = cleanedText.replace(/~~(.+?)~~/g, '$1');
    
    // Headers: # text, ## text, etc.
    cleanedText = cleanedText.replace(/^#{1,6}\s+/gm, '');
    
    // Links: [text](url) - handle URLs that may contain parentheses
    cleanedText = cleanedText.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    
    // Images: ![alt](url) - handle URLs that may contain parentheses
    cleanedText = cleanedText.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
    
    // Code blocks: ```code``` - preserve content (process before inline code)
    cleanedText = cleanedText.replace(/```(?:\w*\n)?([\s\S]*?)```/g, '$1');
    
    // Inline code: `code`
    cleanedText = cleanedText.replace(/`([^`]+)`/g, '$1');
    
    // Blockquotes: > text
    cleanedText = cleanedText.replace(/^>\s+/gm, '');
    
    // Horizontal rules: ---, ***, ___
    cleanedText = cleanedText.replace(/^[-*_]{3,}$/gm, '');
    
    // Unordered lists: - item, * item, + item
    cleanedText = cleanedText.replace(/^[\s]*[-*+]\s+/gm, '');
    
    // Ordered lists: 1. item
    cleanedText = cleanedText.replace(/^[\s]*\d+\.\s+/gm, '');

    // Remove special text tags \n, \t, \r (literal backslash sequences)
    cleanedText = cleanedText.replace(/\\n/g, ' ');
    cleanedText = cleanedText.replace(/\\t/g, ' ');
    cleanedText = cleanedText.replace(/\\r/g, ' ');
    
    // Replace actual newlines, tabs, and carriage returns with spaces
    cleanedText = cleanedText.replace(/[\n\t\r]/g, ' ');

    // Remove multiple consecutive spaces and trim
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

    return cleanedText;
};

module.exports = { cleanText };
