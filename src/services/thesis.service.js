import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

//Reference to collection "thesisContent"
const thesisCollectionRef = collection(db, "thesisContent");

class ThesisDataService {
  //Add Thesis
  addThesis = (newThesis) => {
    return addDoc(thesisCollectionRef, newThesis);
  };

  //Update Thesis
  updateThesis = (id, updatedThesis) => {
    const thesisDoc = doc(db, "thesisContent", id);
    return updateDoc(thesisDoc, updatedThesis);
  };

  //Delete Thesis
  deleteThesis = (id) => {
    const thesisDoc = doc(db, "thesisContent", id);
    return deleteDoc(thesisDoc);
  };

  //Get All Thesis
  getAllThesis = () => {
    return getDocs(thesisCollectionRef);
  };

  //Get Thesis Record
  getThesis = (id) => {
    const thesisDoc = doc(db, "thesisContent", id);
    return getDoc(thesisDoc);
  };
}

export default new ThesisDataService();
