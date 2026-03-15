import CardContainer from "./layout/CardContainer";

const Body: React.FC = () => {
  return (
    <div className="body-container">
      df
      <CardContainer />
      {/* <div className="search-container">
            Search
        </div>
        <button className="filter-btn" onClick = {() => {
            let tempMock = rest.filter(
                (res)=>res.card.card.info.avgRating > 4.5  // arrow function use {} with return or no {} without return
            );
            console.log("Filtered Data", tempMock);
            setRestList(tempMock);
        }}>Top Rated Restaurants</button>
        <div className = "flex flex-wrap">
            {restList.map((restCard, key)=><AlbumCard card = {restCard} key= {key}/>)}
        </div> */}
    </div>
  );
};

export default Body;
