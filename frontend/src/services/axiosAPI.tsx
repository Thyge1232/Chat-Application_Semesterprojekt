// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export const AxiosAPI = (url: string) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(url)
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);
//   if (loading) return <div> </div>;
// };
