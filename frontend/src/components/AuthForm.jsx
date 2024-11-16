// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { api } from '../api/index'
// import { useAuth } from '../context/AuthContext';

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: ''
//   });
//   const { login: setAuth } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       let response;
//       if (isLogin) {
      
//         response = await api.login({
//           email: formData.email,
//           password: formData.password,
//         });
//       } else {
        
//         response = await api.signup({
//           username: formData.name,
//           email: formData.email,
//           password: formData.password,
//         });
//       }

      
//       if (response.success) {
//         setAuth(response.user, response.token);
//         toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
  
        
//         localStorage.setItem('token', response.token);
  
        
//         navigate('/dashboard');
//       } else {
        
//         toast.error(response.message || 'An error occurred.');
//       }
//     } catch (error) {
      
//       toast.error('Something went wrong. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <div className='w-full flex justify-center items-center'>

//         </div>
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           {isLogin ? 'Welcome to CarNation' : 'Create Account'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 required
//               />
//             </div>
//           )}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-black transition duration-200"
//           >
//             {isLogin ? 'Sign In' : 'Sign Up'}
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-orange-600 hover:text-indigo-700 font-medium"
//           >
//             {isLogin ? 'Sign Up' : 'Sign In'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { api } from '../api/index';
import { useAuth } from '../context/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.name, email: formData.email, password: formData.password };

      const response = isLogin ? await api.login(payload) : await api.signup(payload);

      if (response.success) {
        setAuth(response.user, response.token);
        toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'An error occurred.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Welcome to CarNation' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-black transition duration-200"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 hover:text-indigo-700 font-medium"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
