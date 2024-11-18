// media-handler.ts
export class MediaHandler {
    insertTable(rows: number, columns: number) {
        const table = document.createElement('table');
        for (let i = 0; i < rows; i++) {
            const row = table.insertRow();
            for (let j = 0; j < columns; j++) {
                const cell = row.insertCell();
                cell.innerHTML = '&nbsp;'; // Add a space or placeholder
            }
        }
        this.insertElement(table);
    }

    insertImage(src: string, alt: string = '') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        this.insertElement(img);
    }

    private insertElement(element: HTMLElement) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(element);
        }
    }
}
