<script lang="ts">
  
    import { onMount } from 'svelte';
    import type { Message, Conversation, TrainingDataBatch, Role } from './jsonleditor.js';
    import DropdownMenu from '$lib/components/dropdown-menu/index.svelte';
  
    // Store for managing the batch of conversations
    const trainingDataBatch: Conversation[]  = $state([]);

    let selectedConversation: Conversation | null = $state(null);
  
    // Helper functions
    function addConversation(name: string) {
      
        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          name,
          messages: [{ id: `msg-${Date.now()}`, position: 1, role: 'system', content: '' }]
        };
        
        trainingDataBatch.push(newConversation);
  
        selectedConversation = newConversation;

    }
  
    function addMessage(role: Role) {
      if (selectedConversation) {
        const conversation = trainingDataBatch.find(conv => conv.id === selectedConversation?.id);
        if (conversation) {
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            position: conversation.messages.length + 1,
            role,
            content: ''
          };
          conversation.messages.push(newMessage);
          
          // Force reactivity by reassigning selectedConversation
          selectedConversation = { ...conversation };
        }
      }
    }
  
    // Add a default conversation and messages on component mount
    onMount(() => {
      addConversation('Default Conversation');
      addMessage('user');       // Add a user message
      addMessage('assistant');  // Add an assistant message
    });
  
    function selectConversation(id: string) {
      selectedConversation = trainingDataBatch.find(conv => conv.id === id) || null;
    }
  
    function updateMessage(id: string, content: string) {
      if (selectedConversation) {
        const message = selectedConversation.messages.find(msg => msg.id === id);
        if (message) {
          message.content = content;
          // Force reactivity by reassigning selectedConversation
          selectedConversation = { ...selectedConversation };
        }
      }
    }
  
    function exportAsSingleJSONL() {
      const batchData = trainingDataBatch.map(conversation =>
        JSON.stringify({ messages: conversation.messages })
      ).join('\n');
      downloadFile(batchData, "training_data.jsonl");
    }
  
    function exportAsMultipleJSONL() {
      trainingDataBatch.forEach(conversation => {
        const conversationData = JSON.stringify({ messages: conversation.messages });
        downloadFile(conversationData, `${conversation.name}.jsonl`);
      });
    }
  
    function downloadFile(content: string, filename: string) {
      const blob = new Blob([content], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  </script>
  
  <style>

      .conversation {
        border: 1px solid var(--gray-2);
        width: 50%;
        padding: 1em;
        border-radius: 1em;
      }

    .sidebar {
      width: 300px; 
      height: 100%;
      border-right: 1px solid var(--gray-2);
      padding: 1em;
    }

    .message {
      max-height: 10em;
      gap: 0.5em;
    }

    .add-button {
      background-color: var(--gray-1);
      border-radius: 9999px; /* Ensures a capsule shape */
      padding:  var(--default-padding); /* Adjust padding for capsule form */
    }

    .role-icon {
      background-color: var(--gray-2);
      border-radius: 50%;
      width: 2em;
      height: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .message-input {
      border: 1px solid var(--gray-2);
      border-radius: 0.3em;
      padding: 0.5em;
      width: 82%;
    }
    .message.user {
      justify-content: flex-end;
    }
    .message.assistant {
      justify-content: flex-start;
    }

    .export-buttons {
      display: flex;
      gap: 1em;
      margin-top: 1em;
    }

    .system-message {
      width: 100%;
      background-color: var(--gray-1);
      border: none;
      border-radius: 0.5em;
    }
  </style>
  
  <div class="stack expand no-gap" style="--direction: row;">
    <!-- Sidebar for conversations -->
    {@render Sidebar()}
  
    <!-- Editor for selected conversation -->
    <div class="stack expand" style="--direction: column; --align: center; --justify: flex-start;">
      {#if selectedConversation}
        {@render ConversationView(selectedConversation)}
    
      {/if}
    </div>
  </div>


  {#snippet Sidebar()}
  <div class="stack sidebar" style="--direction: column">
    <h3>Conversations</h3>
    <button onclick={() => addConversation(`Conversation ${Date.now()}`)}>+ Add Conversation</button>

      {#each trainingDataBatch as conversation}
     
          <button onclick={() => selectConversation(conversation.id)}>{conversation.name}</button>
        
      {/each}
 
  </div>
  {/snippet}

  {#snippet RoleIcon(role: Role)}
  <span class="role-icon"> {role.slice(0, 1).toUpperCase()} </span>
  {/snippet}
  

  {#snippet MessageView(message: Message)}
  <div class="stack message full-width {message.role}" style="--direction: row;">
    {#if message.role === 'assistant'}
      {@render RoleIcon(message.role)}
    {/if}
    <input
      class="message-input {message.role === 'system' ? 'system-message callout' : ''}"
      type="text"
      bind:value={message.content}
      oninput={(e) => updateMessage(message.id, (e.target as HTMLInputElement).value)}
      placeholder={`Enter ${message.role} message`}
    />
    {#if message.role === 'user'}
      {@render RoleIcon(message.role)}
    {/if}
  </div>
  {/snippet}


  {#snippet ConversationView(conversation: Conversation)}
  <div class="stack expand">

    {@render ConversationHeader(conversation)}
    <div class="stack expand conversation ">
      {#each conversation.messages as message, index}
        {@render MessageView(message)}
      {/each}
      {@render AddMessageButtons()}
    </div>
  </div>
  {/snippet}

  {#snippet AddMessageButtons()}
  <div class="stack full-width" style="--direction: row;">
    <button class="add-button callout" onclick={() => addMessage('assistant')}>Add Assistant Message</button>
    <div class="spacer"></div>
    <button class="add-button callout" onclick={() => addMessage('user')}>Add User Message</button>
  </div>
  {/snippet}

  {#snippet ConversationHeader(conversation: Conversation)}
  <div class="stack full-width" style="--direction: row; --align: center; --justify: space-between; padding: var(--default-padding);">
    <h3 class="regular-material" style="padding: var(--default-padding);  border-radius: 0.5em;">{conversation.name}</h3>
    {@render ExportButtons()}
  </div>
  {/snippet}

  {#snippet ExportButtons()}
  <DropdownMenu>
    {#snippet button()}
    <p class="callout" style="background-color: var(--gray-1); padding: var(--default-padding); border-radius: 0.5em;">Export</p>
    {/snippet}
    {#snippet content()}
    <div class="stack" style="--direction: column;">
      <button class="dropdown-item" onclick={exportAsSingleJSONL}>Export as Single JSONL</button>
      <button class="dropdown-item" onclick={exportAsMultipleJSONL}>Export as Multiple JSONL Files</button>
    </div>
    {/snippet}

  </DropdownMenu>

  {/snippet}