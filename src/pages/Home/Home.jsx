import { Link } from "react-router-dom";
import { StyledArtistList, StyledIntro } from "./Home.styled";
import { useSelector } from "react-redux";

const Home = () => {
  const { isLoading, error, artists } = useSelector((state) => state.artists);
  const { user } = useSelector((state) => state.user);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <>
      <StyledIntro>
        <h1>최애에게 편지를 보내보아요</h1>
      </StyledIntro>
      <StyledArtistList>
        <h1>Artists</h1>
        <ul>
          {artists &&
            artists.map((item) => (
              <li key={item.id}>
                <Link to={user ? `/fanletter?search=${item.name}` : `/signin`}>
                  <div>
                    <img src={item.img} alt="뉴진스" />
                  </div>
                  <p>{item.name}</p>
                </Link>
              </li>
            ))}
        </ul>
      </StyledArtistList>
    </>
  );
};

export default Home;
