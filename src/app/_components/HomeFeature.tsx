export const HomeFeature = () =>{
return(<>
 <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Buy Me a Coffee?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl text-yellow-600 mb-4">☕</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Simple & Easy
              </h3>
              <p className="text-gray-600">
                Support creators with just a few clicks.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-yellow-600 mb-4">💖</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Show Your Love
              </h3>
              <p className="text-gray-600">
                Let creators know you appreciate their work.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-yellow-600 mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Boost Creativity
              </h3>
              <p className="text-gray-600">
                Help creators focus on what they do best.
              </p>
            </div>
          </div>
        </div>
      </div>
</>)
}