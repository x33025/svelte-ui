export interface Identifiable {
    id: string;
    name: string;
  }
      // Type definitions
     export type Role = 'system' | 'user' | 'assistant';
  
  

 export interface Message {
    id: string;
    position: number;
    role: Role;
    content: string;
  }

 export interface Conversation extends Identifiable {
    messages: Message[];
  }

  export interface TrainingDataBatch {
    conversations: Conversation[];
  }