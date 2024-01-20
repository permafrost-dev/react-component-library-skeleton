type Win = typeof Window;
interface WinEx extends Win {
    [key: string]: any;
}

type HTMLEl = typeof HTMLElement;

declare global {
    interface Window extends WinEx {
        [key: string]: any;
    }

    interface HTMLElement extends HTMLEl {
        [key: string]: any;
    }
}
