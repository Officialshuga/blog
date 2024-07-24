import React from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebaseconfig/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';




const Home = ({isAuth}, id) => {
  const [postList, setPostList] = React.useState([]);
  const postCollectionRef = collection(db, "Posts");
  const navigate = useNavigate();
  const deletePost = async(id)=>{
    const postdoc = doc(db, "Posts", id );
    await deleteDoc(postdoc);
  };


//   React.useEffect(()=>{
//     if(!isAuth){
//         navigate("/");
//     }
// })




  React.useEffect(()=>{
    const getPost = async(id)=>{
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      // console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    if(!isAuth){
      navigate("/");
  }
    getPost();
  });
  return (
    <>
    <div className='flex gap-7 flex-wrap justify-center'>
       {postList.map((post)=>{
        return(
          <div key={post.id} className="max-w-[24rem] overflow-hidden rounded-lg shadow-lg">
      <div className="m-0 rounded-none">
        <img
          className="w-full"
          src={post.thumbnail}
          alt="ui/ux review check"
        />
      </div>
      <div className="p-4">
        <h4 className="text-xl font-semibold text-blue-gray-800">
        <Link to={`/blogdescription/${post.id}`}> {post.title} </Link>
        </h4>
        <p className="mt-3 text-gray-600">
        {post.shortPostDescription}
        </p>
      </div>
      <div className="flex items-center justify-between p-4">
      {isAuth && post.author.id === auth.currentUser.uid && (<MdDelete className='text-4xl' onClick={()=>{deletePost(post.id)}}/> )}
      <p className="text-gray-600">{post.date}</p>

        <div className="flex items-center -space-x-3">
        {/* {isAuth && post.author.id === auth.currentUser.uid && (<MdDelete className='text-4xl' onClick={()=>{deletePost(post.id)}}/> )} */}
          {/* <div className="relative">
            <img
              className="w-8 h-8 rounded-full border-2 border-white hover:z-10"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              alt="Natali Craig"
            />
            <span className="absolute bottom-0 left-0 w-8 h-8 bg-black bg-opacity-50 text-white text-xs font-semibold flex items-center justify-center opacity-0 hover:opacity-100">
              {post.author.name}
            </span>
          </div> */}
          {/* <div className="relative">
            <img
              className="w-8 h-8 rounded-full border-2 border-white hover:z-10"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="Tania Andrew"
            />
            <span className="absolute bottom-0 left-0 w-8 h-8 bg-black bg-opacity-50 text-white text-xs font-semibold flex items-center justify-center opacity-0 hover:opacity-100">
              Tania Andrew
            </span>
          </div> */}
        </div> 
        <p>Category: {post.category}</p> 
      </div>
    </div>
    
        )     
        })}
        </div>
      </>
  )
}

export default Home