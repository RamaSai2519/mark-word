import React, { useState } from 'react';
import raxios from '../utils/axios_helper.js';
import { Button, Form, Input, message } from 'antd';
import Home from '../home/index.js';
import { ReactTyped } from 'react-typed';

function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    const { name, email } = values;

    if (name && email) {
      try {
        const response = await raxios.post('/user', {
          name,
          email,
        });

        if (response.status === 200) {
          localStorage.setItem('user_id', response.data.data.user_id);
          localStorage.setItem('session_id', response.data.data.session_id);
          setSubmitted(true);
        } else {
          message.error('Failed to submit. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        message.error('An error occurred. Please try again later.');
      }
    } else {
      message.warning('Please enter your name and email');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="absolute top-10 text-5xl flex font-extrabold">
        <ReactTyped
          strings={[
            `<span>Guess The</span><span class='text-[#4096ff]'> Secret Word !!</span>`,
          ]}
          typeSpeed={100}
          smartBackspace={false}
          showCursor={false}
          contentType='html'
        />
      </div>
      {!submitted ? <div className="bg-lightBlack p-8 rounded-lg shadow-lg w-80">
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ name, email }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
        
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div> : <Home name={name} />}
    </div>
  );
}

export default SignIn;
