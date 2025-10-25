// import { useMutation } from '@tanstack/react-query';

// export const usePostData = <TRequest, TResponse>(endpoint: string) => {
//     return useMutation<TResponse, Error, TRequest>({
//         mutationFn: async (data: TRequest) => {
//             const res = await fetch(endpoint, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//             });

//             if (!res.ok)
//                 throw new Error("Forespørgsel fejlede");
//             return res.json() as Promise<TResponse>;
//     },
//   });
// };
