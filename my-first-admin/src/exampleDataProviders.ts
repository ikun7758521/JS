import jsonServerProvider from "ra-data-json-server";
import restProvider from "ra-data-simple-rest";
import fakeDataProvider from "ra-data-fakerest";

// Data provider from public JSON server
export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);

// Data provider from our own JSON server
export const localDataProvider = jsonServerProvider(
  import.meta.env.VITE_LOCAL_JSON_SERVER_URL,
);

// Data provider from our own REST server
export const restDataProvider = restProvider(
  import.meta.env.VITE_LOCAL_JSON_SERVER_URL,
);

// Data provider from an object without server
export const fakeProvider = fakeDataProvider({
  posts: [
    { id: 0, title: "Hello, world!" },
    { id: 1, title: "FooBar" },
  ],
  comments: [
    { id: 0, post_id: 0, author: "John Doe", body: "Sensational!" },
    { id: 1, post_id: 0, author: "Jane Doe", body: "I agree" },
  ],
});
