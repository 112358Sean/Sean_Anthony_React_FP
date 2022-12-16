import { Routes, Route } from "react-router-dom";
import { Center, Heading, Box} from "@chakra-ui/react";

import Home from "./Home";
import Detail from "./Detail";
import NotFound from "./NotFound";
const App = () => {
  const MyRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="card/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };
  return (
    <div className="App">
      <Box w="100vw" bg="#b25819" p={6}>
        <Center>
          <Heading as="h1" color="#e2ded5">
            Yugi-Oh Card Deck
          </Heading>
        </Center>
      </Box>

      <MyRouter />
    </div>
  );
};

export default App;
