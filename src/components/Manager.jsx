// import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: '', username: '', password: '', id: '' })
    const [passwordArry, setpasswordArry] = useState([])
    const showPassword = () => {
        if (ref.current.src.includes('eye.png')) {

            passwordRef.current.type = 'text'
            ref.current.src = 'eyecross.png'
        } else {
            ref.current.src = 'eye.png'
            passwordRef.current.type = 'password'

        }
    }

    useEffect(() => {
        let passwords = localStorage.getItem('password')
        if (passwords) {
            setpasswordArry(JSON.parse('passwords'))
        }
    }, [])


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('copied to clipboard✅', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setpasswordArry([...passwordArry, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArry, { ...form, id: uuidv4() }]))
            console.log([...passwordArry, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast.error("Error: Cannot Save ❌", {  // Use `toast.error` for error styling
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",  // Dark theme for error styling
            });
        }

    }

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArry(passwordArry.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArry.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "bottom-right",

                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editPassword = (id) => {
        setform(passwordArry.filter(i => i.id === id)[0])
        setpasswordArry(passwordArry.filter(item => item.id !== id))

    }





    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={2000}  // Ensure autoClose is set here
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="mycontainer w-3/4">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

                </h1>
                <p className='text-green-900 text-lg text-center '>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 mx-auto">
                    <input placeholder="Enter website URL" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="site" id="site" value={form.site} onChange={handleChange} />
                    <div className="flex w-full justify-between gap-4">
                        <input placeholder="Enter Username" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="username" id="username" value={form.username} onChange={handleChange} />

                        <div className="relative w-full">
                            <input placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1 pr-12" type="password" name="password" id="password" value={form.password} onChange={handleChange} ref={passwordRef} />
                            <img src="eye.png" alt="Show Password" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer" ref={ref} onClick={showPassword} />
                        </div>
                    </div>
                    <button className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 py-2 w-auto border border-green-900 mx-auto" onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 '>Your Passwords</h2>
                    {passwordArry.length === 0 && <div> No passwords to show</div>}
                    {passwordArry.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArry.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center gap-2 '>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer mt-2' onClick={() => { copyText(item.site) }} >
                                                    <FaRegCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center gap-2 '>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer  mt-2' onClick={() => { copyText(item.username) }}>
                                                    <FaRegCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center gap-2 '>
                                                <span>{item.password}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer mt-2 ' onClick={() => { copyText(item.password) }}>
                                                    <FaRegCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='justify-center py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>

                                })}
                            </tbody>
                        </table>}
                </div>
            </div>



        </>
    )
}

export default Manager
