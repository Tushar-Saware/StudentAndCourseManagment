import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ Comp}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isTrainer = sessionStorage.getItem("isTrainer");

      if (isTrainer === "true") {
        setIsLoading(false);
      } else {
        navigate("/tlogin");
      }
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return <Comp/>;
};

export default Protected;
