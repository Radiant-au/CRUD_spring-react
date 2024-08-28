import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../services/productService';



const ActionButton = (props) => {

  const navigator = useNavigate();

  function handleEdit(){
    navigator(`/edit-product/${props.productID}`)
  }

  function handleDelete(){
    deleteProduct(props.productID).then(()=>{
      location.reload()
    })
  }

  return (
    <div className="flex space-x-2">
        <button  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleEdit}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>
          Delete
        </button>
    </div>
  )
}

export default ActionButton