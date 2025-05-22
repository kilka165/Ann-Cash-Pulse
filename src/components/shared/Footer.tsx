const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-md leading-relaxed">© {currentYear} AnnCashPulse. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;