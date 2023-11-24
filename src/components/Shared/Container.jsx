const Container = ({children, className}) => {
  return (
    <section
      className={`px-4 max-w-screen-xl mx-auto md:flex md:px-8 ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;
