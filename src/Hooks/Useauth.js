// import React from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const Useauth = () => {
//   const [auth, setAuth] = useState();
//   const Verifyauth = async () => {
//     try {
//       const response = await axios.get(
//         'http://localhost:4000/auth/is_logged_in'
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       const data = await Verifyauth();
//       setAuth(data);
//     })();
//   }, []);
//   return { auth };
// };

// export default Useauth;
