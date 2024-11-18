<script lang="ts">
    import { modalVisible, modalContent, closeModal } from './store.js';
    import { fade } from 'svelte/transition';
    import type { Component } from 'svelte';
  
    // Replace reactive declarations with $derived
    let visible = $derived($modalVisible);
    let ModalComponent = $derived($modalContent?.content || null);

    let modalProps = $derived($modalContent?.props || {});
    let ModalHeader = $derived($modalContent?.header || null);
    let ModalFooter = $derived($modalContent?.footer || null);
  </script>
  
  {#if visible && ModalComponent}
    <button
      class="modal-backdrop"
      onclick={closeModal}
      onkeydown={(e) => e.key === 'Escape' && closeModal()}
      aria-label="Close modal"
      transition:fade={{ duration: 100 }}
    ></button>
  
    <button 
      class="modal" 
      onclick={(e) => e.stopPropagation()}
      transition:fade={{ duration: 120 }}
    >
      <!-- Header -->
      {#if ModalHeader}
        <div class="stack full-width modal-header" style="--direction: row;">
          {#if typeof ModalHeader === 'string'}
            <p class="title">{ModalHeader}</p>
          {:else}
            <ModalHeader />
          {/if}
          <div class="spacer" ></div>
          <div class="close-button" role="button" tabindex="0" onclick={closeModal}>
            Close
          </div>
        </div>
      {/if}
  
      <!-- Content -->
      <div class="modal-content">
        {#if ModalComponent}
          <ModalComponent {...modalProps} />
        {/if}
      </div>
  
      <!-- Footer -->
      {#if ModalFooter}
        <div class="modal-footer">
          <ModalFooter />
        </div>
      {/if}
    </button>
  {/if}
  
  <style>
    /* Styles remain the same */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 500;
      border: none;
      padding: 0;
    }
    .modal {
      position: fixed;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 80%;
      z-index: 700;
      background-color: white;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
      border-radius: 1em;
      display: flex;
      flex-direction: column;
    }
    .modal-header,
    .modal-footer {
      background-color: white;
      z-index: 1;
      padding: 1em;
    }
    .modal-header {
      border-radius: 1em 1em 0 0;
      position: sticky;
      top: 0;
    }
    .modal-footer {
      border-radius: 0 0 1em 1em;
      position: sticky;
      bottom: 0;
      box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
    }
    .modal-content {
      flex: 1;
      overflow-y: auto;
      padding: 1em;
    }
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
    }
  </style>
