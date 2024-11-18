import { writable } from 'svelte/store';

export type ContextMenuOption = {
  label: string;
  action: () => void;
};

export type ContextMenuState = {
  show: boolean;
  x: number;
  y: number;
  options: ContextMenuOption[];
};

export const contextMenuVisible = writable(false);
export const contextMenuStore = writable<ContextMenuState | null>(null);

export function openContextMenu(x: number, y: number, options: ContextMenuOption[]) {
  contextMenuStore.set({ show: true, x, y, options });
  contextMenuVisible.set(true);
}

export function closeContextMenu() {
  contextMenuStore.set({ show: false, x: 0, y: 0, options: [] });
  contextMenuVisible.set(false);
}
