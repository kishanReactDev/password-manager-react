import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

  const [src, setsrc] = useState("icons/eye.svg")
  const [form, setform] = useState({ site: '', username: '', password: '' })
  const [passwordarray, setPasswordarray] = useState([])
  const passref = useRef()
  useEffect(() => {

    let passwords = localStorage.getItem('passwords');
    console.log(passwords)
    if (passwords) {
      setPasswordarray(JSON.parse(passwords))
    }
  }, [])

  const copytext = (text) => {
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  const showpassword = () => {
    if (src === "icons/eye.svg") {
      passref.current.type = 'password'
      setsrc("icons/eyecross.svg")
    }
    else {
      setsrc("icons/eye.svg")
      passref.current.type = 'text'
    }
  }

  const savepassword = () => {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
    
    setPasswordarray([...passwordarray, { ...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
    setform({ site: '', username: '', password: '' });
    toast('Password saved!', {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  else{
    toast('Password not saved!', {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  }
      
  }

  const deletepassword = (id) => {
    let a= confirm('Do you really want to delete this password?')
    if(a){
      let updatearray = passwordarray.filter((item) => item.id !== id)
      console.log(updatearray)
      setPasswordarray(updatearray)
      localStorage.setItem("passwords", JSON.stringify(updatearray))
      toast('Password Deleted !', {
        position: "top-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const handleedit = (id) => {
    setform( passwordarray.filter((item) => item.id== id)[0])
    setPasswordarray(passwordarray.filter((item) => item.id!== id))
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }


  return (
    <><ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

      <div className="  p-3 md:mycontainer min-h-[88.2vh]">

        <h1 className='text-4xl font-bold text-center'>
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input name='site' value={form.site} onChange={handlechange} placeholder='Enter website URL' type="text" className='rounded-full border border-green-500 w-full p-4 py-1' id='site' />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input name='username' value={form.username} onChange={handlechange} placeholder='Enter Username' type="text" id='username' className='rounded-full border border-green-500 w-full p-4 py-1' />
            <div className="relative">

              <input ref={passref} name='password' value={form.password} onChange={handlechange} placeholder='Enter Password' type="text" id="password" className='rounded-full border border-green-500 w-full p-4 py-1' />
              <span className='absolute  right-[3px] top-[1.15px] cursor-pointer'>
                <img onClick={showpassword} src={src} className='p-1' alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savepassword} className='flex justify-center items-center gap-2  bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-gray-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold  text-2xl  py-4'>Your Passwords</h2>
          {passwordarray.length === 0 && <div>No passwords to show</div>}
          {passwordarray.length != 0 &&
            <table className="table-auto mb-10 w-full rounded-md overflow-hidden">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordarray.map((item, index) => {
                  return <tr key={index}>
                    <td className=' py-2 border border-white text-center '>
                      <div className="flex items-center justify-center"><a target='_blank' href="{item.site}">{item.site}</a>
                        <div className="size-7 cursor-pointer paddin" onClick={() => { copytext(item.site) }}>
                          <img className='py-1' src="icons/copy.svg" alt="" />
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center w-32 '>
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div className="size-7 cursor-pointer paddin" onClick={() => { copytext(item.username) }}>
                          <img className='py-1' src="icons/copy.svg" alt="" />
                        </div>
                      </div>

                    </td>
                    <td className='py-2 border border-white text-center w-32 '>
                      <div className="flex items-center justify-center">
                        <span>{'*'.repeat(item.password.length)}</span>
                        <div className="size-7 cursor-pointer paddin" onClick={() => { copytext(item.password) }}>
                          <img className='py-1' src="icons/copy.svg" alt="" />
                        </div>
                      </div>
                    </td>
                    <td className=' py-2 border border-white text-center w-32 '>
                      <div className="flex justify-center items-center gap-2">
                        <span onClick={() => { deletepassword(item.id) }} className='cursor-pointer mx-1 '><lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: '25px' }}
                        >
                        </lord-icon></span>
                        <span onClick={() => { handleedit(item.id) }}  className='cursor-pointer '><FaEdit style={{ width: "20px" }} /></span>
                      </div>
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