import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    currentNote: [] 
  }),
  getters: {
    // getNoteByID
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
    },
    getCurrentNote: (state) => () => {
      return state.currentNote
    }
  },
  actions: {
    // fetch all notes
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes')
        this.notes = response.data
      } catch (error) {
        console.error('ERROR Fetching Notes :', error)
      }
    },
    async deleteNoteById(id) {
      try {
        await axios.delete(`http://localhost:3000/notes/${id}`)
        this.notes = this.notes.filter(note => note.id !== id)
      } catch (error) {
        console.error(`ERROR Deleting Note with ID ${id}:`, error)
      }
    },
    editForm(data){
      this.currentNote.push(data)
    },
    async addNote(noteData) {
      try {
        const response = await axios.post('http://localhost:3000/notes', noteData)
        this.notes.push(response.data)
      } catch (error) {
        console.error('ERROR Adding Note:', error)
      }
    },
    async editNote(noteData,id) {
      try {
        await axios.put(`http://localhost:3000/notes/${id}`, noteData);
        const editedNoteIndex = this.notes.findIndex((note) => note.id === id);
        if (editedNoteIndex !== -1) {
          // Replace the old note with the edited note
          this.notes.splice(editedNoteIndex, 1, { id, ...noteData });
        }
      } catch (error) {
        console.error('ERROR Adding Note:', error)
      }
    }
  }
})
