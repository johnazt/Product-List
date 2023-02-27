import {createContext, useEffect, useState} from 'react';

export const Context = createContext(null);

const ProductContext = ({children}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getProductsFromAPI() {
      const data = await fetch('https://dummyjson.com/products');
      const result = await data.json();
      if (result) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setProducts(result.products);
      }
    }
    getProductsFromAPI();
  }, []);

  return (
    <Context.Provider value={{products, loading}}>{children}</Context.Provider>
  );
};

export default ProductContext;
