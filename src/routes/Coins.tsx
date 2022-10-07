import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0, 2rem;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
  font-weight: bold;
`;
const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 2rem;
`;
const Coin = styled.li`
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.textColor};
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1.5rem;
  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.bgColor};
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins: React.FC = () => {
  const { isLoading, data: coins } = useQuery<ICoin[]>(
    ["allCoins"],
    fetchCoins
  );
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
