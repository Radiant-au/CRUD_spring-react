import React, { useEffect, useState } from 'react'
import { addProduct, getProduct, updateProduct } from '../services/productService';
import { useNavigate , useParams } from 'react-router-dom';
import ImagePreview from './ImagePreview';


export default function ProductComponent() {

    const [name , setName] = useState('');
    const [price , setPrice] = useState('');
    const [category , setCategory] = useState('');
    const [description , setDescription] = useState('');
    const [image , setImage] = useState('');
    const [alert , setAlert] = useState(false);
    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        if(id){
            getProduct(id).then((res)=>{
                setName(res.data.name)
                setPrice(res.data.price)
                setCategory(res.data.category)
                setDescription(res.data.description)
                setImage(`http://localhost:8080${res.data.imagePath}`)
            }).catch(error =>{
                console.log(error)
            })
        }
    },[id])

    function onSubmint(e){
        e.preventDefault();

        const product = {name , price , category , description}

        if(name === '' || price === '' || category === '' || description === '' ){
            setAlert(true);
        } else{

            const formdata = new FormData();
            formdata.append('product' , JSON.stringify(product));
            formdata.append('image' , image);

            if(id){
                updateProduct(id,formdata).then(()=>{
                        navigator('/'); 
                }).catch(error =>{
                    console.log(error)
                })
            }else{
                addProduct(formdata).then(() =>{
                        navigator('/'); 
                }).catch(error =>{
                    console.log(error)
                })
            }
            
        }

    }
    
    function pagetitle(){
        if(id){
            return 'Update Product form'
        }else{
            return 'Add Product form'
        }
    }

    
  return (
    <div className=' flex flex-col items-center'>
        {alert && (    
            <div className="max-w-lg flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded items-center my-3" role="alert">
                <strong className="font-bold">Alert!</strong>
                <span className="block sm:inline">Please fill all the fields in the form </span>
                <span onClick={() => setAlert(false)}>
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>)}
        
        <form className="max-w-lg my-5 border-2 p-3 border-gray-400">
            <h1 className='text-center text-2xl my-3'>{pagetitle()}</h1>
            <div className="mb-5 flex gap-2 items-center">
                <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-5 flex justify-between">
                <div className='flex items-center gap-3'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                    <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5" required value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='flex items-center gap-3'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                    <input type="text" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5" required value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea name="description" id="description" className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' rows={10} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="mb-5 flex justify-center border-2 border-gray-400 rounded">
                <ImagePreview onImageSelect={setImage} initialimage={image}/>
            </div>
           
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3" onClick={onSubmint}>Add new product</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-gray-900 rounded-lg border border-gray-800 hover:bg-gray-800 hover:text-blue-700  focus:ring-4 focus:ring-gray-800 " onClick={()=>navigator('/')}>Back</button>
        </form>
    </div>
  )
}
