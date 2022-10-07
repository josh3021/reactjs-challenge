import moment from "moment";
import styled from "styled-components";
import { ITickers } from "./Coin";

interface IPriceProps {
  tickers: ITickers;
  darkMode: boolean;
}

const PriceContainer = styled.div<{ darkMode: boolean }>`
  background-color: ${(props) =>
    props.darkMode ? props.theme.textColor : props.theme.bgColor};
  padding: 32px;
  border-radius: 16px;
`;

const PercentLabel = styled.span`
  color: #bdc3c7;
  font-size: 1.3rem;
  font-weight: bold;
`;

const PercentDate = styled.span`
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 300;
`;

const PercentNumber = styled.div<{ data: number }>`
  font-size: 1.3rem;
  font-weight: 900;
  color: ${(props) =>
    props.data < 0 ? "#3498db" : props.data === 0 ? "#95a5a6" : "#e74c3c"};
`;

const Percent = styled.div`
  display: flex;
  justify-content: space-between;
`;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Price: React.FC<IPriceProps> = ({
  tickers: {
    quotes: { USD },
  },
  darkMode,
}) => {
  return (
    <PriceContainer darkMode={darkMode}>
      <Percent>
        <PercentLabel>Current Price</PercentLabel>
        <PercentNumber data={USD.price}>
          {formatter.format(USD.price)}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>All Time High</PercentLabel>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <PercentNumber data={USD.ath_price}>
            {formatter.format(USD.ath_price)}
          </PercentNumber>
          <PercentDate>
            {moment(USD.ath_date).format("MMM.DD.YYYY hh:mm:ss A")}
          </PercentDate>
        </div>
      </Percent>
      <Percent>
        <PercentLabel>Market Cap Change 24H</PercentLabel>
        <PercentNumber data={USD.market_cap_change_24h}>
          {USD.market_cap_change_24h}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>Market Cap</PercentLabel>
        <PercentNumber data={USD.market_cap}>
          {formatter.format(USD.market_cap)}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_15m</PercentLabel>
        <PercentNumber data={USD.percent_change_15m}>
          {USD.percent_change_15m}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_30m</PercentLabel>
        <PercentNumber data={USD.percent_change_30m}>
          {USD.percent_change_30m}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_1h</PercentLabel>
        <PercentNumber data={USD.percent_change_1h}>
          {USD.percent_change_1h}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_6h</PercentLabel>
        <PercentNumber data={USD.percent_change_6h}>
          {USD.percent_change_6h}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_12h</PercentLabel>
        <PercentNumber data={USD.percent_change_12h}>
          {USD.percent_change_12h}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_24h</PercentLabel>
        <PercentNumber data={USD.percent_change_24h}>
          {USD.percent_change_24h}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_7d</PercentLabel>
        <PercentNumber data={USD.percent_change_7d}>
          {USD.percent_change_7d}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_change_30d</PercentLabel>
        <PercentNumber data={USD.percent_change_30d}>
          {USD.percent_change_30d}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>percent_from_price_ath</PercentLabel>
        <PercentNumber data={USD.percent_from_price_ath}>
          {USD.percent_from_price_ath}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>volume_24h</PercentLabel>
        <PercentNumber data={USD.volume_24h}>
          {formatter.format(USD.volume_24h)}
        </PercentNumber>
      </Percent>
      <Percent>
        <PercentLabel>volume_24h_change_24h</PercentLabel>
        <PercentNumber data={USD.volume_24h_change_24h}>
          {USD.volume_24h_change_24h}
        </PercentNumber>
      </Percent>
    </PriceContainer>
  );
};

export default Price;
