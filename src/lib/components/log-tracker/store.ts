import { writable } from "svelte/store";

export const logs = writable<string[]>([]); // A store to keep log messages

export function addLog(message: string) {
    // Adds the message to the logs and keeps the latest ones
    logs.update(currentLogs => [...currentLogs, message]);
}