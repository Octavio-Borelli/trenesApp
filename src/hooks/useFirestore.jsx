// import { useState, useEffect } from "react"
// import { getDatabase, ref, get, onValue } from "firebase/database";
// import firebased from "../firebase/firebase";

// const db = getDatabase(firebased);

// const useFirestore = () => {

//     const [viaje, setViaje] = useState([])

//     const dataFirebase = async () => {
//         try {
//             const dbRef = ref(db, "viajes");
//             const snapshot = await get(dbRef);
//             const info = snapshot.val();
//             setViaje(info.data);
//             console.log(info.data);
//             onValue(dbRef, dataFirebase);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         dataFirebase();
//     }, []);

//     return {
//         viaje
//     }

// }


// export default useFirestore