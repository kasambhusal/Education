import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';


const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
export default function Login() {

    return (
        <div className="mainformdivandall flex justify-center items-center w-screen h-screen bg-purple-300">
        <Form
        className='flex flex-col justify-center items-center w-[450px] py-8 bg-purple-200'
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <div className="logowala my-10">
        <span className='text-2xl font-semibold mr-1 text-blue-900'>LOGO</span><span className='text-purple-900'>Kya huwa re</span>
    </div>
    <Form.Item
    className='w-[90%]'
      label="Username"
      name="username"
      rules={[
        {
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
    className='w-[90%] '
      label="Password"
      name="password"
      rules={[
        {
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item className='w-[90%]' name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null} className='ml-[-50px]'>
        <div className='w-full flex justify-center'>

      <Button type="primary" htmlType="submit" className='px-28'>
        Submit
      </Button>
        </div>
    </Form.Item>
  </Form>
  </div>
    )
}
