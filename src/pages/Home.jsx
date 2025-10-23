import React, { useContext, useState } from 'react';
import Nav from '../components/NAv';
import Categories from '../Category';
import Card from '../components/Card.jsx';
import Card2 from '../components/Card2.jsx';
import { food_items } from '../Food.js';
import { dataContext } from '../context/UserContext.jsx';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";



function Home() {
const { Cate, setCate, input, showCart, setShowCart } = useContext(dataContext)
const [activeCategory, setActiveCategory] = useState("All")

  function filter(category) {
    setActiveCategory(category)
    if (category === "All") {
      setCate(food_items)
    } else {
      const newList = food_items.filter(
        (item) => item.food_category === category
      )
      setCate(newList)
    }
  }


let items = useSelector(state => state.cart)

let subtotal = items.reduce((total, item) => total+item.qty*item.price, 0)
let deliveryFee = 30;
let taxes = subtotal*0.5/100;
let total = Math.floor(subtotal + deliveryFee + taxes);


  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <Nav />
      {!input?<div className="flex flex-wrap justify-center items-center gap-5 w-full pt-6">
        {Categories.map((item) => (
          <div
            key={item.name} // ✅ unique key
            onClick={() => filter(item.name)}
            className={`w-[140px] h-[150px] flex flex-col items-start justify-start text-[20px] font-semibold rounded-lg shadow-xl cursor-pointer gap-5 p-5 transition-all duration-300 
              ${
                activeCategory === item.name
                  ? 'bg-green-300 text-white scale-105'
                  : 'bg-white text-gray-600 hover:bg-green-200'
              }`}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>:null}

      <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8">
        {Cate.length>1?Cate.map((item) => (
          <Card
            key={item.id} // ✅ unique key
            name={item.food_name}
            image={item.food_image}
            price={item.price}
            id={item.id}
            type={item.food_type}
          />
        )):<div className='text-center text-5xl text-green-500 font-semibold pt-5'>No Items Found</div>}
        
      </div>

      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 ${showCart?"translate-x-0":"translate-x-full"} flex flex-col items-center overflow-auto`}>
        <header className='w-[100%] flex justify-between items-center'>
          <span className='text-green-400 text-[18px] font-semibold'>Order Items</span>
          <RxCross2 className='w-[30px] h-[30px] cursor-pointer text-green-400 text-[18px] font-semibold hover:text-gray-600 transition-all' onClick={()=>setShowCart(false)} />
        </header>

        {items.length>0 ? <>

          <div className='w-full mt-8 flex flex-col gap-8'>
          {items.map((item) => (
            <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty}/>
          ))}
          </div>

          <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>

            <div className='w-full flex justify-between items-center'>
              <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
              <span className='text-green-400 font-semibold text-md'>Rs. {subtotal}/-</span>
            </div>

            <div className='w-full flex justify-between items-center'>
              <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
              <span className='text-green-400 font-semibold text-md'>Rs. {deliveryFee}/-</span>
            </div>

            <div className='w-full flex justify-between items-center'>
              <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
              <span className='text-green-400 font-semibold text-md'>Rs. {taxes}/-</span>
            </div>

          </div>

          <div className='w-full flex justify-between items-center p-9'>
              <span className='text-2xl text-gray-600 font-semibold'>Total</span>
              <span className='text-green-400 font-semibold text-2xl'>Rs. {total}/-</span>

          </div>

          <button className="w-[80%] p-3 bg-green-400 rounded-lg text-white hover:bg-green-500 transition-all cursor-pointer  m-1" onClick={() => {
            toast.success("Order Placed")
          }}>Place Order</button>

        </> : <div className='text-center text-2xl text-green-500 font-semibold pt-5'>Cart is Empty</div>} 
        

      </div>  

        
    </div>
  )
}

export default Home