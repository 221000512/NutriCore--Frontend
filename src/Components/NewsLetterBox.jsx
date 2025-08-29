const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert('Subscribed successfully!');
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        LogIn/Signup now 
      </p>
      

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none "
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xl px-10 py-4 "
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
