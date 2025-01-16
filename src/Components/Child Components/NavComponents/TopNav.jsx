import { Button, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
const { Search } = Input;
export default function TopNav() {
  const onSearch = (value) => {
    console.log(value)
  }
  return (
    <div className='w-full flex justify-evenly md:h-[50px] items-center bg-[white]'>
      <h1><Link className='flex gap-2' to="/"><img className='h-[45px] w-[60px] md:w-[45px]' src="/ES.jpg" alt="logo" /><img className='h-[45px]' src="/Edusphere.jpg" alt="logo" /></Link></h1>
      <Search
        placeholder="Search"
        onSearch={onSearch}
        style={{
          maxWidth: 500,
        }}
        className='rounded-lg border-green-400'
      />

      <Link to="/dashboard/login">
        <button className='font-[500] text-[#fff] bg-[#7ED321] py-[5px] px-[16px] rounded-3xl'>
          Join / Login
        </button>
      </Link>
    </div>
  )
}