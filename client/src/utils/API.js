import axios from "axios";

export default {
  // Gets all journals
  getJournals: function() {
    return axios.get("/api/journals");
  },
  // Gets the journal with the given id
  getJournal: function(id) {
    return axios.get("/api/journals/" + id);
  },
  // Deletes the journal with the given id
  deleteJournal: function(id) {
    return axios.delete("/api/journals/" + id);
  },
  // Saves a journal to the database
  saveJournal: function(journalData) {
    return axios.post("/api/journals", journalData);
  }
};
