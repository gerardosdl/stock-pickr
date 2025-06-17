/* 
"Debouncing" is when we want to limit how often
a function is called .
For example, when a user is typing we may want to call
a function no more than every second instead instead of
every keystroke.
*/

import { useState, useEffect, useRef } from "react";

// Variables outside of the function component can be used
// to remember info that does not need to be state.  However,
// all instances of this component would share the same variable.
const delayMs = 1000;

export default function StockFilter({ stocks, handleFilter }) {
  const [filterText, setFilterText] = useState("");
  const [debounce, setDebounce] = useState(false);

  // Refs are used to "remember" info like state, except
  // that if changed, it does not cause a re-render
  const timerIdRef = useRef();

  useEffect(
    function () {
      function doFilter() {
        const re = new RegExp(`.*${filterText}.*`, "i");
        const filtered = stocks.filter((stock) => re.test(stock.name));
        handleFilter(filtered);
      }
      if (!debounce) {
        doFilter();
      } else {
        // Get/set the value of a ref via its current property
        timerIdRef.current = setTimeout(doFilter, delayMs);
      }
      // Return "cleanup" function that runs right before the
      // next time the effect callback runs.  In this case, we
      // need to cancel the pending timeout if the user presses
      // another key
      return () => clearTimeout(timerIdRef.current);
    },
    [filterText, debounce, stocks]
  );

  return (
    <div className="stock-filter">
      Filter{" "}
      <input
        value={filterText}
        onChange={(evt) => setFilterText(evt.target.value)}
      />
      <br />
      Debounce?
      <input
        type="checkbox"
        checked={debounce}
        onChange={(evt) => setDebounce(!debounce)}
      />
      &nbsp;
      <span>(delay {delayMs} milliseconds)</span>
    </div>
  );
}
