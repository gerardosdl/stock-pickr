export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>
        <strong>Disclaimer: </strong>This app is designed to help users pick and
        take notes on their strategy or observations over time. It uses the free
        version of the Polygon API, which is limited to 5 calls per minute.
        Please note that stock prices - including the "current price" and "price
        when added" - are based on the previous day's closing data and may not
        reflect real-time market conditions. This tool is for informational and
        personal tracking purposes only, and should not be used as financial
        advice.
      </p>
    </>
  );
}
