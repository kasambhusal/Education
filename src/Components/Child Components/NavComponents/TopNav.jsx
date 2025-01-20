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
      <div className="h-full flex items-center">
        <Link className='flex gap-2' to="/"><img className='h-[48px] w-[180px]' src="/logo.png" alt="logo" /></Link>
      </div>
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