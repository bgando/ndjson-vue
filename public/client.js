var app = new Vue({
  el: '#app',
  data: {
    todos: []
  }
});

const streamerr = e => {
  console.warn("Stream error");
  console.warn(e);
}

fetch("/api").then((response) => {
  return can.ndjsonStream(response.body);

}).then(todosStream => {
  const reader = todosStream.getReader();
  const read = result => {
    if (result.done) {
      console.log("Done.");
      return;
    }

    console.log(result.value);
    render(result.value);

    reader.read().then(read, streamerr);
  };
  
  reader.read().then(read, streamerr);
});

let counter = 0;

const render = val => {
  app.todos.push(val)
};