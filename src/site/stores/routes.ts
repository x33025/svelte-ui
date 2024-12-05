import type { Component } from "svelte";
import { Layers } from '$lib/icons/index.js'; // Import icons if necessary

export interface Route {
    path: string; // The URL path for the route
    title: string; // The title displayed in the navigation
    meta_description: string; // Metadata for SEO or additional context
}

export interface HeroItem {
    gridArea: string; // Auto-incremented index for grid mapping
    title: string; // Display title
    description: string; // Description for HeroItem display
    color: string; // The color used for visual representation
    icon?: Component; // Optional icon for the item
    path?: string; // Optional path, only for route-based HeroItem items
}

export const routes: Route[] = [
    { path: '/', title: 'Home', meta_description: "Welcome to Svelte UI, a declarative library for building UI in Svelte." },
    { path: '/components', title: 'Components', meta_description: 'A library of reusable UI components.' },
    { path: '/core', title: 'Core', meta_description: 'Standardized CSS and HTML foundations.' },
    { path: '/layout', title: 'Layout', meta_description: 'Simple, flexible layout structures.' },
    { path: '/style', title: 'Style', meta_description: 'Predefined CSS styles, including colors, typography, and more.' },
    { path: '/blog', title: 'Blog', meta_description: 'A blog about Svelte UI and web development.' },
    { path: '/workshop', title: 'Workshop', meta_description: 'Explore ongoing projects and experiments.' }
];

type RoutePaths = typeof routes[number]['path'];

const heroItemProperties: Record<RoutePaths, { color: string; icon?: Component; description: string }> = {
    '/workshop': { color: '--indigo', icon: undefined, description: 'Explore ongoing projects and experiments.' },
    '/components': { color: '--blue', icon: undefined, description: 'A library of reusable UI components.' },
    '/core': { color: '--cyan', icon: undefined, description: 'Standardized CSS and HTML foundations.' },
    '/layout': { color: '--mint', icon: Layers, description: 'Simple, flexible layout structures.' },
    '/style': { color: '--purple', icon: undefined, description: 'Predefined CSS styles, including colors, typography, and more.' },
    '/blog': { color: '--orange', icon: undefined, description: 'A blog about Svelte UI and web development.' }
};

export const heroItems: HeroItem[] = [
    // Add Hero items based on routes, excluding "Home"
    ...routes
        .filter(route => route.path !== '/') // Exclude Home
        .map(route => ({
            gridArea: route.path.substring(1) || 'home', // Map the path to a grid area (e.g., 'workshop', 'components')
            title: route.title,
            description: heroItemProperties[route.path as RoutePaths]?.description || route.meta_description,
            color: heroItemProperties[route.path as RoutePaths]?.color || '--blue',
            icon: heroItemProperties[route.path as RoutePaths]?.icon,
            path: route.path // Retain the path for navigation
        })),
    // Add standalone Hero items (no path)
    { 
        gridArea: 'feature', 
        title: 'Svelte UI', 
        description: "A minimalistic library for building UI in <span style='color: var(--orange); font-weight: bold;'>Svelte</span>, offering <strong>components</strong>, <strong>styles</strong>, and <strong><em>design philosophy</em></strong> to address common web development pitfalls.", 
        color: '--orange', 
        icon: undefined 
    },
    { 
        gridArea: 'comingSoon', 
        title: 'More Coming Soon', 
        description: 'Exciting updates and new components are on the way!', 
        color: '--yellow', 
        icon: undefined 
    }
];

