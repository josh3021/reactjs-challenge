import { faHome, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useMatch, useParams } from "react-router";
import { Link, PathMatch, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

type RouteParam = {
  coinId: string;
};

type RouteState = {
  state?: {
    name: string;
  };
};

interface ILinks {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
}

interface ILinkExtended {
  url: string;
  type: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface ITeam {
  id: string;
  name: string;
  position: string;
}

interface IWhitepaper {
  link: string;
  thumbnail: string;
}

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  team: ITeam[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: ILinks;
  links_extended: ILinkExtended[];
  whitepaper: IWhitepaper;
  first_data_at: string;
  last_data_at: string;
}

export interface ITickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  padding: 0 1rem;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
  font-weight: bold;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #121212;
  text-align: center;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const Description = styled.p<{ darkMode: boolean }>`
  margin: 2rem 0;
  color: ${(props) =>
    props.darkMode ? props.theme.textColor : props.theme.bgColor};
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const Mode = styled.div`
  display: flex;
  padding: 8px;
  border: 1px solid #2c3e50;
  border-radius: 100%;
  background-color: "transparent";
  &:hover {
    cursor: pointer;
    background-color: #1c2e40;
    transition: all 0.8s;
  }
`;

const Coin: React.FC = () => {
  const { coinId } = useParams<RouteParam>();
  const { state } = useLocation() as RouteState;
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const priceMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/price");
  const chartMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/chart");

  const { isLoading: isInfoLoading, data: infos } = useQuery<IInfo>(
    ["info", coinId],
    async () => coinId && fetchCoinInfo(coinId)
  );

  const { isLoading: isTickersLoading, data: tickers } = useQuery<ITickers>(
    ["tickers", coinId],
    async () => coinId && fetchCoinTickers(coinId),
    { refetchInterval: 10000 }
  );
  const loading = isInfoLoading || isTickersLoading;

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    if (darkMode) body.style.backgroundColor = "#2F3640";
    else body.style.backgroundColor = "#fff";
  }, [darkMode]);

  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => navigate("/")}
            style={{ color: "black" }}
          />
          {state?.name ? state.name : loading ? "Loading..." : infos?.name}
          <Mode onClick={() => setDarkMode((v) => !v)}>
            {darkMode ? (
              <FontAwesomeIcon
                icon={faMoon}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <FontAwesomeIcon icon={faSun} style={{ width: 20, height: 20 }} />
            )}
          </Mode>
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK</span>
              <span>{infos?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL</span>
              <span>{infos?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE</span>
              <span>${tickers?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description darkMode={darkMode}>{infos?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY</span>
              <span>{tickers?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY</span>
              <span>
                {tickers?.max_supply !== 0 ? tickers?.max_supply : "∞"}
              </span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route
              path="price"
              element={
                tickers && <Price tickers={tickers} darkMode={darkMode} />
              }
            />
            <Route
              path="chart"
              element={coinId && <Chart coinId={coinId} darkMode={darkMode} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;
