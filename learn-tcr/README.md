# TCR -- Test Commit Reset

## Tools

For typescript:

``` bash
run-when-changed \
    --watch "src/**/*.ts" \
    --exec "ts-node %filepath && git commit -am ok || git reset --hard"
```

## Docs

References:
- [TCR test && commit || revert -- Rope in Python](https://www.youtube.com/playlist?list=PLlmVY7qtgT_nhLyIbeAaUlFOWbWT5y53t)
- [substring, TCR style](https://www.youtube.com/watch?v=ZrHBVTCbcE0&ab_channel=KentBeck)
