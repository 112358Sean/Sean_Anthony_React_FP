import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import Cards from "./Cards";
function Home() {
  const source = "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4"
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(source);
      const responseJson = await response.json();
      if (sort === false) {
        let coba = responseJson.data.sort((i, j) => i.name.localeCompare(j.name));
        setData(coba);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  function sortData(type) {
    if (type === "Name" || type === "") {
      let dataSort = data.sort((i, j) => i.name.localeCompare(j.name));
      setData(dataSort);
      setSort(!sort);
    } else if (type === "Attack") {
      let dataSort = data.sort((i, j) => i.atk - j.atk);
      setData(dataSort);
      setSort(!sort);
    } else {
      let dataSort = data.sort((i, j) => i.def - j.def);
      setData(dataSort);
      setSort(!sort);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Box my={5} display={"flex"} justifyContent="center">
            <Select
              w={"50%"}
              name="sort"
              onChange={(e) => {
                sortData(e.target.value);
              }}
            >
              <option value="">Select Option</option>
              <option value="Name">Name</option>
              <option value="Attack">Attack</option>
              <option value="Defence">Defence</option>
            </Select>
          </Box>
          <Cards card={data} />
        </>
      )}
    </>
  );
}

export default Home;
