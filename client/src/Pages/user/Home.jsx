import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  // Assuming you have Redux state structure like { user: { name: 'Redux User' }, ... }
  const reduxUserData = useSelector((state) => state.user);

  return (
    <div className="pt-28">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Card 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Card 2</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Card 3</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Card 4</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      {/* Additional Text */}
      <div className="mt-8">
        <p>This is some additional text on the home page.</p>
      </div>

      

      <div className="mt-8">
        <p>Name: {reduxUserData.name}</p>
      </div>
    </div>
  );
};

export default Home;
