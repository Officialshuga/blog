import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseconfig/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';



const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async()=>{
        auth.onAuthStateChanged(async(user)=>{
            console.log(user);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            }else{
                console.log("User is not logged in")
            }
        });
    };
    useEffect(()=>{
        fetchUserData();
    }, []);
    
    // const logout = async () => {
    //     try {
    //       await auth.signOut();
    //       Navigate("/");
    //       toast.success("logout successful", {
    //         position: "bottom-center"
    //       });
    //     } catch (err) {
    //       toast.error(err, {
    //         position: "top-right"
    //       });
    //     }
    //   };
  return (
    <div> 
        {userDetails? (
            <>
                <h1> firstName: {userDetails.firstname}</h1>
                <h1> lastName: {userDetails.lastname}</h1>
                <h1>Email: {userDetails.email}</h1>
                <button  className='bg-red-200 py-3 px-7 text-3xl font-normal' type='submit'>LOGOUT</button>
            </>
        ):
        (<p>Loading!!!!</p>)}
    </div>
  );
}

export default Profile