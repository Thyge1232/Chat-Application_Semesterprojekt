export const displayError = (err: Error) => {
  console.log(err);
  alert("Noget gik galt: " + err.message);
  return (
    <img src="/public/Images/Error.png" alt="error" className="h-160 w-160" />
  );
};
