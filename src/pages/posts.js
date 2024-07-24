import React from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db, auth, storage } from '../firebaseconfig/firebase'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import Loader from '../components/loader'


const Posts = ({isAuth}) => {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("")
    const [postDescription, setPostDescription] = React.useState("")
    const [shortPostDescription, setShortPostDescription] = React.useState("")
    const [thumbnail, setthumnail] = React.useState();
    const [category, setcategory] = React.useState("");


    const addPost = async() =>{
        if (title === "" || postDescription === "" || thumbnail === "" || shortPostDescription === ""){
            return alert("All fields must be filled")
        }
        uploadImage();
        
    }

    const uploadImage = async() =>{
        if(!thumbnail) return;
        const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
        uploadBytes(imageRef, thumbnail).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url)=>{
                const productRef = collection(db, "Posts")
                try{
                    addDoc(productRef, {
                        title,
                        postDescription,
                        time: Timestamp.now(),
                        category,
                        thumbnail: url,
                        shortPostDescription,
                        author: {   
                            name: auth.currentUser.displayName, 
                            id: auth.currentUser.uid
                        },
                        date: new Date().toLocaleString(
                            "en-US",
                            {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            }
                        )
                    });
                    navigate("/home")
                    alert("post addded successfully");
                }catch(error){
                    console.log(error)
                }
            })
        })
    }

    React.useEffect(()=>{
        if(!isAuth){
            navigate("/");
        }
    })

    const handleSelectChange = (e) => {
        setcategory(e.target.value);
        console.log(category);
      };
      console.log(category);


  return (
    <>
        <div className='cont'>
        <div className="red">
            <h1 className='text-5xl'>Create a Post</h1>
            <label className='text-3xl font-bold'>Title:</label>
            <input placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type='file' onChange={(e)=> setthumnail(e.target.files[0])}/>
            <label className='text-3xl font-bold'>Description:</label>
            <textarea placeholder='Post...' onChange={(e)=>{setPostDescription(e.target.value)}}/>
            <label className='text-3xl font-bold'>Short Description:</label>
            <textarea placeholder='Post...' onChange={(e)=>{setShortPostDescription(e.target.value)}}/>
            <select onChange={handleSelectChange}>
                <option >Category</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="School">School</option>
                <option value="Fashion">Fashion</option>
                <option value="News">News</option>
            </select>
            {/* <input name='category' placeholder='category' value={category} onChange={(e)=>setcategory(e.target.value)}/>  */}
            <button className='bg-blue-300 text-2xl font-medium rounded-3xl w-' onClick={addPost}> Create Post </button>
            </div>
      </div>
    </>
  )
}

export default Posts