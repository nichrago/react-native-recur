# react-native-recur
cleaner asynchronous recursion

```jsx
<Recur initial={initialData}>
  {(data, next, recur) => {
    // data:   the object you provided to render some level of recursion
    // next:   placeholder for next level of recursion
    // recur:  function that when called renders the next level of recursion with the data being 
    //         whatever you supply the function. If it is a single object then it is simply passed 
    //         along. If it is an array then this 'render prop' will be called with every element 
    //         of the array and will be rendered as siblings and so a key prop is necessary.
  }}
</Recur>
```
