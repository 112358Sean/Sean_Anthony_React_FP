import { Image, Button, Text, Heading} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Detail() {
  const [dataCard, setDataCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
      const responseJson = await response.json();
      setDataCard(responseJson.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Link to="/">
        <Button m={2}>
          Back
        </Button>
      </Link>
      {isLoading ? (
        <Heading as="h1">Loading...</Heading>
      ) : (
        dataCard.map((card, index) => (
          <div key={index}>
            <div>
              <div>
                <div>
                  {card.card_images.map((item, index) => (
                    <Image key={index} maxW="sm" src={item.image_url} alt="" />
                  ))}
                </div>
                <div>
                <Heading my={5} fontStyle="bold">
                  {card.name}
                </Heading>
                  <Text>{`Level: ${card.level}`}</Text>
                  <div>
                    <Text>
                      Attribute:
                    </Text>
                    <Text>{card.attribute}</Text>
                  </div>
                  <div>
                    <Text>
                      Power:
                    </Text>
                    <Text>
                      ATK/{card.atk} DEF/{card.def}
                    </Text>
                  </div>
                  <div>
                    <Text>
                      Type:
                    </Text>
                    <Text>{`[ ${card.type} / ${card.race} ]`}</Text>
                  </div>
                  <Text>
                    Description: {card.desc}
                  </Text>
                </div>
              </div>
            </div>
            <Heading my={5} fontStyle="bold">
              Card Set
            </Heading>
            <div>
              {card.card_sets.map((cardSet) => (
                <div>
                  <Text>{`Name: ${cardSet.set_name}`}</Text>
                  <Text>{`Code: ${cardSet.set_code}`}</Text>
                  <Text>{`Rarity: ${cardSet.set_rarity}`}</Text>
                  <Text>{`Price: ${cardSet.set_price}`}</Text>
                  <br/>
                  <br/>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Detail;
