# Stock PickR

Stock PickR is a personal stock-tracking web app that lets users add stocks, track price history, and take notes on each entry. It’s designed for individuals or small groups who want a simple way to follow their picks and reflect on strategy over time. Inspired by an early interest in investing, this app provides a lightweight alternative to complex platforms — ideal for jotting down observations, watching stock performance, and organizing ideas.

Users can filter their stock list, add, edit or delete notes, and compare the price when added to the latest (previous close) data, all within a responsive, minimal interface. Stock PickR is powered by the free version of the Polygon API, which limits requests to 5 per minute. As a result, all price data is based on the previous trading day’s close and does not reflect real-time market movement. This tool is intended solely for informational and personal tracking purposes.

---

## Screenshots

- **Homepage View**  
  ![Screenshot of home page](https://i.imgur.com/GONRVGl.png)

- **Stock List View**  
  ![Screenshot of stock list ](https://i.imgur.com/dOQqBEY.png)

- **Stock Details View**  
  ![Screenshot of stock detail page](https://i.imgur.com/2f0sFxj.png)

- **Add Stock**  
  ![Screenshot of add stock form](https://i.imgur.com/DbkmQsq.png)

- **Add Note**  
  ![Screenshot of add note form](https://i.imgur.com/kw3eEOo.png)

- **Edit Note**  
  ![Screenshot of edit note form showing delete and edit buttons](https://i.imgur.com/mRGACiY.png)

---

## Technologies Used

- MongoDB
- Mongoose
- Express.js
- React.js
- Node.js
- JavaScript (ES6+)
- CSS
- Polygon.io API

---

## Getting Started

- [View Project Planning Docs](https://trello.com/b/EeIciRkB)
- [Launch the Live App](https://stock-pickr-231b4dae260d.herokuapp.com/)

---

## Future Improvements

- Display a small historical chart of the stock’s price on the Details page for visual evaluation
- Allow users to update the price of a stock directly from the Details page and create a price log
- Add notification or alert system for significant stock price changes
- Enable sharing and collaboration on tracked stocks with other users
- Improve mobile responsiveness and accessibility
- Add interactive transitions or animations for a more dynamic UI
- Integrate AI or ML API to suggest patterns or insights based on user-tracked data (exploratory)
- Use paid versions of APIs to increase rate limits and access more accurate data

---

## References

- [React official documentation](https://react.dev/)
- [Polygon.io API](https://polygon.io/docs) – Used for fetching stock data (free tier limits to 5 requests/minute)
- [MongoDB official docs](https://www.mongodb.com/docs/manual/)
- [MDN – HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Express.js official error handling guide](https://expressjs.com/en/guide/error-handling.html)
- [NN/g – 10 Design Guidelines for Reporting Errors in Forms](https://www.nngroup.com/articles/errors-forms-design-guidelines/)
- [InterServer – Understanding & Handling 429 Too Many Requests Errors](https://www.interserver.net/tips/kb/understanding-and-handling-429-too-many-requests-errors/)
- [https://uiverse.io/AlimurtuzaCodes/average-liger-0](https://uiverse.io/AlimurtuzaCodes/average-liger-0)

---
