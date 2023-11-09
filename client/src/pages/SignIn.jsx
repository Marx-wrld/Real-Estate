import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

const SignIn = () => {
  const [formData, setFormData] = useState({}); //state to keep track of all the changes in the form
  const {loading, error} = useSelector((state) => state.user); //state to keep track of all the errors
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData (
      {
        ...formData,
        [e.target.id] : e.target.value,
      }
    )
  } //function to handle the changes in the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold m-7'>Sign In</h1>
      
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...': 'Sign In'}</button>
      </form>
      <div disabled={loading} className="flex gap-2 mt-5 mb-5">
        <p>Don&apos;t have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  )
}

export default SignIn 