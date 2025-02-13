export const HomeNavbar = () => {
    return (
    <>
           <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-600">Buy Me a Coffee</div>
          <div className="flex space-x-4">
            <a href="/account/signin" className="text-gray-700 hover:text-yellow-600 px-4 py-2">
              Log In
            </a>
            <a
              href="/account/signup"
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
            >   
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </>
    )
}