import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImageUrl } from '../../utils/getImgUrl.js';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/features/cart/cartSlice.js';
import { useFetchBookByIdQuery } from '../../Store/features/books/booksApi.js';

const SingleBook = () => {
    const {id} = useParams();
    // console.log(id,"hello")
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    // console.log(book)
    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error happending to load book info</div>
  return (
    <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImageUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
                </div>

                <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
            </div>
        </div>
  )
}

export default SingleBook