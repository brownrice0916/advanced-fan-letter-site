import { Link } from "react-router-dom";
import { datas } from "../../shared/artists";
import { StyledArtistList, StyledIntro } from "./Home.styled";

const Home = () => {
  return (
    <>
      <StyledIntro>
        <h1>최애에게 편지를 보내보아요</h1>
      </StyledIntro>
      <StyledArtistList>
        <h1>Artists</h1>
        <ul>
          {datas.map((item) => (
            <li key={item.id}>
              <Link to={`/fanletter?search=${item.name}`}>
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
