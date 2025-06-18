export default function HomePage() {
  return (
    <>
      <h1>Stock PickR</h1>
      <img
        src="https://i.imgur.com/WX15AHh.png"
        alt="bull and bear"
        className="bull-bear-img"
        style={{
          opacity: 0.4,
          mixBlendMode: "multiply",
          width: "80%",
          borderRadius: "1rem",
        }}
      />
      <p className="disclaimer">
        <strong>Disclaimer: </strong>This app is designed to help users pick a
        stock and take notes on their strategy or observations over time. It
        uses the free version of the Polygon API, which is limited to 5 calls
        per minute. Please note that stock prices - including the "current
        price" and "price when added" - are based on the previous day's closing
        data and may not reflect real-time market conditions. This tool is for
        informational and personal tracking purposes only, and should not be
        used as financial advice.
      </p>
    </>
  );
}
