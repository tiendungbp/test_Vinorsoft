import axios from "axios";
import "./style.scss";
import React, { useEffect, useState } from "react";
interface Pokemon {
  name: string;
}
const Vinor = () => {
  const [listPoke, setListPoke] = useState<Pokemon[]>([]);
  const [ininVinor, setInitVinor] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const fetchPoke = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      setListPoke(res?.data?.results);
      setInitVinor(res?.data?.results);
    };
    fetchPoke();
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    try {
      if (search === "") {
        setListPoke(ininVinor);
      } else {
        const fillterList = ininVinor.filter((poke) => {
          return poke.name.toLowerCase().includes(search);
        });
        setListPoke(fillterList);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const highlightSearch = (name: string, searchTerm: string) => {
    const parts = name.split(new RegExp(`(${searchTerm})`,"gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={i}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  return (
    <div className="w-[670px] m-auto">
      <p>List poke 123 789</p>
      <input
        className="w-full outline-none px-[20px] py-[10px] rounded-[7px]"
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
      <div className="w-full flex justify-center">
        <table>
          <tr>
            <td>STT</td>
            <td>Tên Pokemon</td>
          </tr>
          {listPoke?.map((item, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{highlightSearch(item.name, searchTerm)}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Vinor;
