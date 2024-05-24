import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../Redux/Auth/Action';
import { register } from '../../Redux/Auth/Action';

const Signup = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ full_name: "", email: "", password: "" });
  const {auth} = useSelector(store=>store);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit ",inputData);
    dispatch(register(inputData))
    setOpenSnackbar(true);
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputData((values)=>({...values,[name]:value}))
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  useEffect(()=>{
    if(token)dispatch(currentUser(token))
  }, [token]);

  useEffect(()=>{
    if(auth.reqUser?.full_name){
        navigate("/")
    }
  },[auth.reqUser]);

  return (
    <div>
        <div>
            <div className='flex flex-col justify-center min-h-screen items-center'>
                <div className='w-[30%] p-10 shadow-md bg-white'>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <p className='mb-2'>Username</p>
                            <input
                            className='py-2 px-3 outline outline-green-600 w-full rounded-md border-1'
                            type='text'
                            placeholder='Enter username'
                            name='full_name'
                            onChange={(e)=> handleChange(e)}
                            value={inputData.full_name}
                            />
                        </div>
                        <div>
                        <p className='mb-2'>Email</p>
                            <input
                            className='py-2 px-3 outline outline-green-600 w-full rounded-md border-1'
                            type='text'
                            placeholder='Enter your Email'
                            name='email'
                            onChange={(e)=> handleChange(e)}
                            value={inputData.email}
                            />
                        </div>
                        <div>
                        <p className='mb-2'>Password</p>
                            <input
                            className='py-2 px-2 outline outline-green-600 w-full rounded-md border-1'
                            type='text'
                            placeholder='Enter your Password'
                            name='password'
                            onChange={(e)=> handleChange(e)}
                            value={inputData.password}
                            />
                        </div>
                        <Button
                type="submit"
                sx={{ bgcolor: green[700], padding: ".5rem 0rem" }}
                className="2-full bg-green-600"
                variant="contained"
              >
                Sign Up
              </Button>
                        
                    </form>
                    <div className='flex space-x-3 items-center mt-5'>
                        <p className=''>Already have Account?</p>
                        <Button variant="text" onClick={() => navigate("/signin")}>
              SignIn
            </Button>
                    </div>
                </div>
            </div>
            <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          You Account Successfully Created!
        </Alert>
      </Snackbar>
        </div>
    </div>
  )
}

export default Signup