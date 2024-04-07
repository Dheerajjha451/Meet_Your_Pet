const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-customBlue to-customButton text-white text-center py-4">
      <p>&copy; {currentYear} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
