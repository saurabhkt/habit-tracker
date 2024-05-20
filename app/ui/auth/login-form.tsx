export default function LoginForm() {
  return (
    <div className="px-6 py-12 bg-white rounded-xl shadow-xl">
        <h2 className="text-black text-2xl font-medium text-center">Welcome back 🙂</h2>
        <form className="flex flex-col gap-4 mt-20 text-left text-black">
            <div className="relative">
                <input id="email" type="text" name="email" placeholder="john@doe.com" className="peer h-10 w-full
                border-b-2 border-gray-300 text-gray-900
                placeholder-transparent
                focus:outline-none
                focus:border-gray-600
                "/>
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm cursor-text transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2 peer-focus:-top-3.5
                peer-focus:text-gray-600 peer-focus:text-sm
                ">
                Email</label>
            </div>
            <div className="mt-6 relative">
                <input id="password" type="password" name="password" placeholder="password" className="peer h-10 w-full
                border-b-2 border-gray-300 text-gray-900
                placeholder-transparent
                focus:outline-none
                focus:border-gray-600
                "/>
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm cursor-text transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2 peer-focus:-top-3.5
                peer-focus:text-gray-600 peer-focus:text-sm
                ">
                Password</label>
            </div>
            <button
                type="submit"
                className="rounded-md bg-blue-500 text-white font-semibold p-2 mt-16 cursor-pointer
                hover:bg-blue-400
                ">
                Log in
            </button>
        </form>
    </div>
    );
}
