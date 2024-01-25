<script>
import { useNotesStore } from '@/stores/notes';


export default {
  data() {
    return {
      notesStore: useNotesStore(),
      note: {
        title: '',
        content: '',
      },
      currentNote:null
    };
  },
  methods: {
    async submitNote() {
      const newNoteData = {
        title: this.note.title,
        content: this.note.content,
      };

      if (newNoteData.title.trim() !== '') {
        await this.notesStore.addNote(newNoteData);
        await this.notesStore.fetchNotes();
        this.clearArea();
      }
    },
    clearArea() {
      this.note.title = '';
      this.note.content = '';
    },
  },
  computed:{
   publishedBooksMessage() {
      // `this` points to the component instance
    return this.notesStore.getCurrentNote();
    }
  
  },
 
 
};
</script>

<template>
  <div class="p-4 border rounded shadow-lg"> <label for="">
    {{ publishedBooksMessage }}
  </label>
    <form @submit.prevent="submitNote">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.title"
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          id="content"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.content"
          rows="4"
        />
      </div>
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
        Add
      </button>
    </form>
  </div>
</template>
