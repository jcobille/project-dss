import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import MovieContainer from "../components/views/MovieContainer";
import { AutoComplete } from "../components/views/CustomInput";
import { Actor, Movie } from "../utils/types";
import { searchActorMovie } from "../utils/services";
export interface HomePageProps { }

const HomePage = () => {
  const { movies, status } = useAppSelector(({ movieList }) => movieList);
  const actorList = useAppSelector(({ actorList }) => actorList.actors);
  const [data, setData] = useState<Movie[] | Actor[]>([]);
  const [searchType, setSearchType] = useState("movie");
  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let { type, data } = searchActorMovie(value, movies, actorList);
    setSearchType(type);
    setData(data);
  };

  return (
    <section>
      <div className="section">
        <div className="content">
          <span className="title text-center">
            Find Movies, TV shows and more
          </span>
          <div className="search-div">
            <div className="row">
              <div className="col">
                <AutoComplete
                  className="search-input input-lg autocomplete"
                  name="searchBox"
                  changeHandler={changeHandler}
                  data={data}
                  placeHolder="Search Movies and Actor"
                  type={searchType}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <MovieContainer movies={movies} limit={32} />
          {status === "idle" && movies.length === 0 && (
            <div className="d-flex justify-content-center">
              No movies yet. Please come back later.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
