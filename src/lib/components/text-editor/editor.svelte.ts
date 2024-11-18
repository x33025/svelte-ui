import { SmartStyle, TextFormatter, LinkHandler, MediaHandler, TextSanitizer } from './modules/index.js';

export class Editor {
    public smartStyleState = $state(true);
    public smartStyle: SmartStyle;
    public textFormatter: TextFormatter;
    public linkHandler: LinkHandler;
    public mediaHandler: MediaHandler;
    public textSanitizer: TextSanitizer;

    
    constructor() {
        this.smartStyle = new SmartStyle();
        this.textFormatter = new TextFormatter(this.smartStyle);
        this.linkHandler = new LinkHandler(this.smartStyle);
        this.mediaHandler = new MediaHandler();
        this.textSanitizer = new TextSanitizer();
    }

    toggleSmartStyle() {
        this.smartStyle.toggleSmartStyle();
        this.smartStyleState = this.smartStyle.isSmartStyleEnabled;
    }


}


export const editor = new Editor();
