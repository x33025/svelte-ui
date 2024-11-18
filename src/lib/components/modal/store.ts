import { writable } from 'svelte/store';
import type { Component } from 'svelte';

interface ModalContent {
    content: Component;
    props?: any;
    header?: Component;
    footer?: Component;
}
export const modalVisible = writable(false);
export const modalContent = writable<ModalContent | null>(null);

export function openModal(
    content: Component,
    header?: Component,
    props?: any,
    footer?: Component
) {
    console.log("Opening modal with component:", content.name, "header:", header, "and props:", props);
    modalContent.set({ content, props, header, footer });
    modalVisible.set(true);
    console.log("Modal is now visible:", true);
}


export function closeModal() {
    console.log("Closing modal");
    modalContent.set(null);
    modalVisible.set(false);
    console.log("Modal is now visible:", false);
}
