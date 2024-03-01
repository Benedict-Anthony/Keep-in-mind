import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "./firebase/config";
import { courses } from "./data/courses";

export async function seedDatabase() {
  courses.forEach(async (course) => {
    try {
      const collectionRef = collection(database, "courses");
      await addDoc(collectionRef, course);
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  });
}
