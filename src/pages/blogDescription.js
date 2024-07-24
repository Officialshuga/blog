import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseconfig/firebase';
import Loader from '../components/loader';
// import { Button } from "@material-tailwind/react";


const BlogDescription = ({isAuth}) => {
    const [getBlogs,setGetBlogs] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const getAllBlogs = async() =>{
        try{
            const productTemp = await getDoc(doc(db, "Posts", params.id))
            if(productTemp.exists()){
                setGetBlogs(productTemp.data());
            }else{
                console.log("Document does not exist")
            }
        }catch(error){
            console.log(error);
        }
    }


 useEffect(()=>{
    getAllBlogs();
    if(!isAuth){
        navigate("/");
    }
 })

    // const params = useParams();
    // function createMarkup(c) {
    //     return {_html: c};
    // }
    // createMarkup();
  return (
    <>
        {getBlogs? (
            <>
            <div className="flex flex-col items-center mx-5 my-5 p-6 bg-white shadow-md rounded-lg">
            <img src={getBlogs?.thumbnail} alt="Blog Thumbnail" className="bdesc-pic"/>
                {/* <img src={getBlogs?.thumbnail} alt="Blog Thumbnail" class="w-full h-48 object-cover rounded-md mb-4"/> */}
                <h4 className="text-2xl font-semibold text-gray-800 mb-2">{getBlogs?.title}</h4>
                <p className="text-gray-600 mb-4">{getBlogs?.postDescription}</p>
                <p className="text-gray-400 text-sm">{getBlogs?.date}</p>
                <p>Category: {getBlogs?.category}</p>

            </div>
            </>
    
        ): (<Loader/>)}
    </>
  )
}

export default BlogDescription;
