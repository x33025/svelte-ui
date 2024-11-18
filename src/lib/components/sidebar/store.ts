import { writable } from 'svelte/store';
import type { Component } from 'svelte';

export enum SidebarOrientation {
    Right = 'right',
    Left = 'left'
}

interface SidebarContent {
    component: Component;
    orientation: SidebarOrientation;
}

export const sidebarVisible = writable(false);
export const sidebarContent = writable<SidebarContent | null>(null);

export function openSidebar(component: Component, orientation: SidebarOrientation = SidebarOrientation.Right) {
    console.log("Opening sidebar with orientation:", orientation);
    sidebarContent.set({ component, orientation });
    sidebarVisible.set(true);
}

export function closeSidebar() {
    sidebarVisible.set(false);
    setTimeout(() => {
        sidebarContent.set(null);
    }, 300);
}