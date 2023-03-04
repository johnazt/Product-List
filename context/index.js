import {createContext, useEffect, useState} from 'react';

export const Context = createContext(null);

const ProductContext = ({children}) => {
  //List of Products
  const [products, setProducts] = useState([]);
  // loading state
  const [loading, setLoading] = useState(false);
  // favorites
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToFavorite = (productId, reason) => {
    let copyFavoriteItems = [...favoriteItems];
    const index = copyFavoriteItems.findIndex(item => item.id === productId);
    if (index === -1) {
      let getCurrentProductItem = products.find(item => item.id === productId);
      copyFavoriteItems.push({
        title: getCurrentProductItem.title,
        id: productId,
        reason,
      });
    } else {
      copyFavoriteItems[index] = {
        ...copyFavoriteItems[index],
        reason,
      };
    }
    setFavoriteItems(copyFavoriteItems);
  };

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

  const handleRemoveFavorite = getCurrentId => {
    let copyFavoriteItems = [...favoriteItems];

    copyFavoriteItems = copyFavoriteItems.filter(
      item => item.id !== getCurrentId,
    );

    setFavoriteItems(copyFavoriteItems);
  };

  return (
    <Context.Provider
      value={{
        products,
        loading,
        addToFavorite,
        favoriteItems,
        handleRemoveFavorite,
      }}>
      {children}
    </Context.Provider>
  );
};

export default ProductContext;
