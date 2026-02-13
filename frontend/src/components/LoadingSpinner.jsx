const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`loading-spinner ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-4 text-earth-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
