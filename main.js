import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 60 },
    { duration: '3m', target: 60 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  const url = 'http://localhost:8421/users';
  const payload = JSON.stringify({
    email: "cat@gmail.com",
    myCustomKey: 1234,
    name: "Cat",
    password: "1234567",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  // const res = http.get(url);
  
  // Check for success (HTTP 2xx)
  check(res, {
    'is status 2xx': (r) => r.status >= 200 && r.status < 300,
  });

  // Check for failure (HTTP 4xx or 5xx)
  check(res, {
    'is status 4xx or 5xx': (r) => r.status >= 400 && r.status < 600,
  });
}