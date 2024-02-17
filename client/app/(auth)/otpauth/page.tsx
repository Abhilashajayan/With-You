"use client"
import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';

const Page: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setCode((prevCode) => {
      const newCode = prevCode.split('');
      newCode[index] = value;
      return newCode.join('');
    });

    if (index < inputRefs.current.length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
      setCode((prevCode) => {
        const newCode = prevCode.split('');
        newCode[index - 1] = '';
        return newCode.join('');
      });
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className='flex items-center justify-center bg-white min-h-screen'>
        <div className='w-full max-w-md p-5 rounded shadow-md'>
          <div className="mx-auto w-[150px] h-[90px]rounded-full overflow-hidden">
            <img
              src="/Bae-logos-removebg-preview.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center mb-5 text-black">
            <p className='text-2xl'>0:{timer} </p>
            <p className='text-[10px]'>Type the Verification code <br /> That we've sent</p>
          </div>
          <div className="flex justify-center space-x-3">
            {Array.from({ length: 4 }, (_, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                value={code[index] || ''}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="border border-gray-300 w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 rounded p-4 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            ))}
          </div>

          <div className="flex justify-center p-5">
            <a href="/signup" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
              Continue
            </a>
        
          </div>
          <div className="flex justify-center p-5">
            <a className='text-red-500' href="">Send Again</a>
            </div>
        </div>
      </div>
    </>
  );
}

export default Page;

