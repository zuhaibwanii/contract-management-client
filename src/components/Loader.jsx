// Spinner Loader Component with regular CSS
const Loader = ({ isLoading, message = "Loading contracts..." }) => {
    if (!isLoading) return null;
    
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <span className="loader-text">{message}</span>
        
        {/* Inline styles */}
        <style jsx>{`
          .loader-container {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            gap: 8px;
          }
          
          .spinner {
            width: 24px;
            height: 24px;
            border: 2px solid #ccc;
            border-top-color: #3498db;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          
          .loader-text {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  };

  export default Loader;