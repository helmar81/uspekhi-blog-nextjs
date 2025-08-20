jsx
const Container = ({ className, children }) => {
  const defaultClasses = "container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg";
  const combinedClasses = className ? `${defaultClasses} ${className}` : defaultClasses;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default Container;