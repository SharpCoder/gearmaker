# README

Here's how to setup this thing

```
ps aux | grep Xvfb | awk '{system("kill "$2)}'

export DISPLAY=:99
Xvfb :99 -screen 0 800x600x24 -noreset&

node /app/app.js
```