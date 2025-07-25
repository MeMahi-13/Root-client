import UseAuth from "../../hooks/UseAuth";

const Social = () => {

    const  {signInWithGoogle} =UseAuth();
    const handleGoogleSignIn = ()=>{
signInWithGoogle()
.then(result =>{
    console.log(result.user)
})
.catch(error => {
    console.error(error);
})
    }
  return (
    <div className="flex justify-center my-4">
      <button onClick={handleGoogleSignIn}
        aria-label="Sign in with Google"
        className="
          flex items-center
          bg-white border border-gray-200
          rounded-md
          p-0.5 pr-4
          hover:shadow-md transition-shadow
        "
      >
        <div className="
            flex items-center justify-center
            bg-white w-9 h-9 rounded-l-md
          "
        >
          {/* Google SVG logo */}
          <svg width="16" height="16" viewBox="0 0 512 512">
            <g>
              <path d="M0 0h512v512H0z" fill="#fff" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
        </div>
        <span className="text-sm text-gray-700 tracking-wide">
          Login with Google
        </span>
      </button>
    </div>
  );
};

export default Social;
