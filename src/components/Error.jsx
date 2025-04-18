export const Error = ({ error }) => {
   const lookupMsg = {
      404: "Not found",
      400: "Bad request",
   };

   return (
      <div>
         <p>Error {error}: {lookupMsg[error]}</p>
      </div>
   );
}
