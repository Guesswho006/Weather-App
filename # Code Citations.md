# Code Citations

## License: MIT
https://github.com/Aliviahhilliard/Weather-Dashboard/tree/0cfb8b2478ed6799b7b15ab961fbbf0eab96546c/Assets/js/script.js

```
{
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(history))
```

