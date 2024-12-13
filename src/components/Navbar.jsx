import React,{useState} from 'react'
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import avatarImg from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../AuthContext/AuthContext.jsx';
const navigation = [
    {name:'Dashboard', href:'/dashboard'},
    {name:'Order', href:'/orders'},
    {name:'Card Page', href:'/cart'},
    {name:'Check Out', href:'/checkout'}
]



function Navbar() {
    // currUser = true;
    const [isDropdownOpen, setisDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems)

    const { currentUser,logout} = useAuth()
    const handleLogout = () => {
          logout()
    }

  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
        <nav className='flex justify-between items-center'>
          {/* left */}
            <div className='flex justify-between items-center md:gap-16 gap-4'>
            
            <Link to='/'><HiBars3CenterLeft className='size-6'/></Link>
            <div className='bg-[#EAEAEA] flex justify-between items-center rounded-md p-1 gap-2'>
            <IoSearchSharp />
            <input type="text" placeholder='Search here...' className='bg-[#EAEAEA] w-full focus: outline-none'/>
            </div>
             
            </div>
            {/* right */}
            <div className='relative flex justify-center items-center md:space-x-3 space-x-2 '>
              <div>
              {currentUser ? 
              <> <button onClick={() => setisDropdownOpen(!isDropdownOpen)}>
              <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}/>
              </button>
              {/* show dropdowns */}
              {isDropdownOpen && <div className='absolute mt-2 right-0 rounded-md bg-white w-48 shadow-lg z-40'>
                <ul className='py-2'>
                {navigation.map((item)=> <li key={item.name} onClick={() => setisDropdownOpen(false)}>
                    <Link to={item.href} className='block text-sm px-4 py-2 hover:bg-gray-100'>
                        {item.name}
                    </Link>
                </li>
                )
              }
              <li>
                <button onClick={handleLogout} className='block w-full  text-sm px-4 py-2 text-left hover:bg-gray-100'>Logout</button>
              </li>
                </ul>
              </div>}
              </> 
              : <Link to = '/login'><FaRegUserCircle className='size-6'/></Link> }
              </div>
             
              
              <button className='hidden sm:block'><CiHeart className='size-6'/></button>
              
              <div className='bg-primary rounded-md px-4 py-1 flex justify-center items-center gap-2 sm:ml-1'>
              <Link to='/cart'><FaCartArrowDown className='size-6 text-white'/></Link>
              
               <span className='text-white font-semibold'>{cartItems.length}</span>
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar