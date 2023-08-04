import React from 'react';
import {
  LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer,
} from 'recharts';
import resolveCurrency from '../util/currencyResolver';
import './PriceHistory.css';

function PriceHistory({
  history, web,
}) {
  return (
    <div className="product-history">
      <ResponsiveContainer aspect={1.2}>
        <LineChart data={history}>
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toDateString()} />
          <YAxis domain={['auto', 'auto']} tickFormatter={(value) => `${value} ${resolveCurrency(web)}`} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="price" stroke="#646cff" />
          <Tooltip contentStyle={{ backgroundColor: '#242424' }} labelFormatter={(date) => new Date(date).toDateString()} formatter={(value) => `${value} ${resolveCurrency(web)}`} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PriceHistory;
