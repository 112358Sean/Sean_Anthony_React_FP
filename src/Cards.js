import React from "react";
import { Image, Heading, Box, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Cards = ({ card }) => {
  console.log(card);
  return (
    <SimpleGrid display={"flex"} justifyContent={"center"} style={{ flexWrap: "wrap" }}>
      {card.map((kartu, index) => (
        <Link key={index} to={`card/${kartu.id}`}>
          <Box className="yugioh-card">
            {kartu.card_images.map((item, index) => (
              <Image m={2} key={index} w={"300px"} src={item.image_url} alt="" />
            ))}
            <div>
              <Heading w={"300px"} as="h2" fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
                {kartu.name}
              </Heading>
              <br/>
            </div>
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default Cards;
