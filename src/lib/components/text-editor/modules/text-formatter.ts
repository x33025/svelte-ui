import { SmartStyle } from './smart-style.svelte.js';

export class TextFormatter {

    private smartStyle: SmartStyle;

    constructor(smartStyle: SmartStyle) {
        this.smartStyle = smartStyle;
    }

    private toggleStyle(command: string, value: string = '') {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (this.smartStyle.isSmartStyleEnabled) {
                this.smartStyle.expandSelectionToWordBoundary(range);
            }
            document.execCommand(command, false, value);
        }
    }

    toggleBold() {
        this.toggleStyle('bold');
    }

    toggleItalic() {
        this.toggleStyle('italic');
    }

    toggleUnderline() {
        this.toggleStyle('underline');
    }

    toggleHeading(level: number) {
        this.toggleStyle('formatBlock', `H${level}`);
    }

    toggleH2() {
        this.toggleHeading(2);
    }

    toggleH3() {
        this.toggleHeading(3);
    }

    toggleH4() {
        this.toggleHeading(4);
    }

    cycleHeading() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const parentElement = this.findClosestBlockParent(range.commonAncestorContainer);
    
            const headingLevels = ['H1', 'H2', 'H3', 'H4'];
            let nextHeadingIndex = 0; // Default to H1 if no heading is found
    
            if (parentElement) {
                const currentTag = parentElement.tagName.toUpperCase();
                const currentIndex = headingLevels.indexOf(currentTag);
    
                // Determine the next heading level
                nextHeadingIndex = (currentIndex + 1) % headingLevels.length;
            }
    
            this.toggleHeading(nextHeadingIndex + 1); // +1 to match H1, H2, etc.
        }
    }
    
    private findClosestBlockParent(node: Node): HTMLElement | null {
        let currentNode: Node | null = node;
        while (currentNode && currentNode.nodeType === Node.TEXT_NODE) {
            currentNode = currentNode.parentNode;
        }
    
        while (currentNode && (!(currentNode instanceof HTMLElement) || 
               !['H1', 'H2', 'H3', 'H4', 'P', 'DIV'].includes(currentNode.tagName.toUpperCase()))) {
            currentNode = currentNode.parentNode;
        }
    
        return currentNode as HTMLElement | null;
    }

    toggleAlignLeft() {
        this.toggleStyle('justifyLeft');
    }

    toggleAlignCenter() {
        this.toggleStyle('justifyCenter');
    }

    toggleAlignRight() {
        this.toggleStyle('justifyRight');
    }

    toggleAlignJustify() {
        this.toggleStyle('justifyFull');
    }

    toggleOrderedList() {
        this.toggleStyle('insertOrderedList');
    }

    toggleUnorderedList() {
        this.toggleStyle('insertUnorderedList');
    }

    isList(): boolean {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const parentElement = this.findClosestBlockParent(range.commonAncestorContainer);
            return !!parentElement && ['UL', 'OL'].includes(parentElement.tagName.toUpperCase());
        }
        return false;
    }

    removeList() {
        if (this.isList()) {
            this.toggleStyle('insertUnorderedList'); // Toggle off unordered list
            this.toggleStyle('insertOrderedList');   // Toggle off ordered list
        }
    }

}
