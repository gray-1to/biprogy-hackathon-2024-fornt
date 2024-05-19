const Footer = () => {
    return (
      <footer className="bg-blue-500 text-white py-4 fixed w-full bottom-0 z-10">
        <div className="container mx-auto flex justify-center items-center px-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TaskTimeGardian. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  