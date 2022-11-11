import React, {  lazy, Suspense, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';

const Card = lazy(() => import('./components/Card/Card'));

const currency = 'USD';
const order = 'market_cap_desc';
const limit = 10;
let currentPage = 0;
const showSparkline = true;
const priceChangePercentage = '7d';

const App = () => {
  const [list, setList] = useState<number[]>([]);

  const fetchItems = () => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=${limit}&page=${currentPage}&sparkline=${showSparkline}&price_change_percentage=${priceChangePercentage}`)
        .then(res => res.json())
        .then(json => {
          const newList = [...list, ...json];
          setList(newList);
          currentPage++;
        });
  };

  const loadMore = () => {
    fetchItems();
  };

  const renderItems = () => {
    return (
      <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {
          list.map((item: any) => {
            const volume = Math.round(Math.abs(item.market_cap_change_24h) / item.current_price);

            return <Card
              key={`${item.name}-${currency}`}
              currency={currency}
              currentPrice={item.current_price}
              image={item.image}
              name={item.name}
              priceChangePercentage={item.price_change_percentage_24h}
              sparklineData={item.sparkline_in_7d}
              symbol={item.symbol}
              volume={volume}
            />
          }
        )}
      </InfiniteScroll>
    )
  };

  return (
    <div className="App">
      <Suspense fallback={<div>Loading data...</div>}>
        {renderItems()}
      </Suspense>
    </div>
  );
}

export default App;
