import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import { ReactTyped } from "react-typed"; // Import ReactTyped as a named export
import { ArrowLeftOutlined } from '@ant-design/icons';
import raxios from "../utils/axios_helper.js";
import ProgressBar from "../components/progress/index.js";
import LottieConfetti from "../components/confetti/index.js";

const Home = (name) => {
    const [command, setCommand] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentRank, setCurrentRank] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [currentHint, setCurrentHint] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleBack = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleCommand = async () => {
        setLoading(true);
        try {
            const response = await raxios.post('/chat', {
                command: command,
                session_id: localStorage.getItem('session_id'),
                user_id: localStorage.getItem('user_id')
            })

            const output = JSON.parse(response.data.data.output);

            setCurrentRank(Number(output.rank));
            setCurrentWord(output.word);
            setCurrentHint(output.hint);
        } catch (error) {
            console.error('Error fetching the script:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (currentRank === 1) {
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
                localStorage.clear();
                window.location.reload();
                }, 6000);
        }
    }, [currentRank]);

    return (
        <div className="flex flex-col gap-5 items-center justify-center h-screen relative w-full">
            <Button
                onClick={handleBack}
                className="absolute top-4 right-4"
                icon={<ArrowLeftOutlined />}
                type="link"
                size="large"
            >
                Back
            </Button>
            <div className="text-9xl flex font-extrabold">
                <ReactTyped
                    strings={[
                        `<span>Hello</span><br/><span class='text-[#4096ff]'>${name.name.toString().charAt(0).toUpperCase() + name.name.toString().slice(1)} !!</span>`,
                    ]}
                    typeSpeed={100}
                    smartBackspace={false}
                    showCursor={false}
                    contentType='html'
                />
            </div>
            <div className="flex gap-5 w-1/2 justify-center items-center mt-14">

                <Form onFinish={handleCommand} className="flex gap-3 w-full items-center justify-center">
                    <Form.Item
                        rules={[{ required: true, message: 'Please enter a word' }]}
                    >
                        <Input
                            ref={inputRef}
                            size="large"
                            className='w-full text-xl text-center'
                            placeholder="Enter Word"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} size="large" htmlType="submit">Enter</Button>
                    </Form.Item>
                </Form>
            </div>
            {currentHint && <div className="text-2xl text-center w-1/2">{currentHint}</div>}
            <ProgressBar rank={currentRank} word={currentWord} />
            {showConfetti && <LottieConfetti />}
        </div>
    );
};

export default Home;
